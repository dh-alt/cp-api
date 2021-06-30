const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email({allowUnicode: false}).lowercase().trim(),
    password: Joi.string().required().custom(password),
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
      .keys({
        email: Joi.string().email({allowUnicode: false}).lowercase().trim(),
        password: Joi.string().custom(password),
        firstname: Joi.string().trim(),
        lastname: Joi.string().trim(),
        phone: Joi.string().trim(),
        status: Joi.string(),
      })
      .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
