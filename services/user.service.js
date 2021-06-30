const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.apiKey);

const getUserById = async (id) => {
  return User.findByPk(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({where: {email}});
};

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  
  /* STEP 1 = Create User */
  const user = await User.create(userBody);

  /* STEP 2 = create stripe customer object */
  const stripeCustomer = await stripe.customers.create({
    address: user.address,
    name: user.getFullname(),
    phone: user.phone,
    email: user.email,
    description: ''
  });
  
  /* STEP 3 = Save stripe customer id */
  /* TODO::DH Retry Logic? */
  await user.update({paymentCustomerId: stripeCustomer.id});

  return user;
};

const queryUsers = async (filter, options) => {
  const users = await User.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return users;
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  /* TODO::DH delete from stripe? */
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
