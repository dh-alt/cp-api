const httpStatus = require('http-status');
const {Sequelize, sequelize, Op, DataTypes, Model} = require('../config/db');
const {Order, Timeslot, PromoCode, User} = require('../models');
const ApiError = require('../utils/ApiError');
const fakeKeyGen = require('../utils/keygen');
const config = require('../config/config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.apiKey);


const getOrderById = async (id) => {
  return Order.findByPk(id);
};

const createOrder = async (orderBody) => {
  let order = null;
  try {
    const {timeslotId, userId, lat, lng, address, promoCode} = orderBody;
    let {firstname, lastname, phone, paymentCustomerId} = orderBody;

    const transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });

    /* Timeslot Info */
    const timeslot = await Timeslot.findOne({
      where: {
        id: orderBody.timeslotId,
        sold: false,
      },
    }, {transaction});

    if (!timeslot) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Timeslot already taken');
    }
    const {startTime, endTime, amount, surcharge, discount, vanId} = timeslot;

    /* User Info */
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
      }
      ({firstname, lastname, phone, paymentCustomerId} = user);
    }

    /* Promo Code Info */
    let promo = null;
    if (promoCode) {
      promo = await PromoCode.findOne({
        where: {
          code: promoCode,
          used: {
            [Op.lt]: sequelize.col('count'),
          },
          invalid: false,
          expires: {
            [Op.gt]: moment().unix(),
          },
        },
      }, {transaction});
    }

    const location = {type: 'Point', coordinates: [lng, lat]};
    
    /* Order Payload */
    const orderPayload = {
      vanId,
      timeslotId,
      userId,
      promoCodeId: promo && promo.id,
      location,
      firstname,
      lastname,
      phone,
      address,
      amount,
      promoDiscount: promo && promo.discountAmount,
      promoCode,
      discount,
      surcharge,
      startTime,
      endTime,
    };

    /* STEP 1 = Create Order */
    order = await Order.create(orderPayload);
    /* STEP 2 = Update TimeSlot to SOLD */
    timeslot.update({sold: true});
    /* STEP 3 = Update "used" column on Promo Code */
    if (promo) {
      promo.update({used: promo.used + 1});
    }

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw (err);
  }

    /* STEP 4 = Create and attach Payment Intent to Order */
    const statement_descriptor = `${config.app.name} #${fakeKeyGen(5)}${order.id}`;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.paymentAmount * 100,
        currency: "usd",
        customer: paymentCustomerId,
        setup_future_usage: !!user,
        statement_descriptor, // max 22 characters
        payment_method_types: ['card'],
    });
    await order.update({paymentIntent: paymentIntent.id})

    order.paymentIntent = paymentIntent;
    return order;
};

const queryOrders = async (filter, options) => {
  const orders = await Order.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return orders;
};

const updateOrderById = async (orderId) => {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    /* TODO::DH Need to discuss Driver Update logic */
    return order;
  };
  

const cancelOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  /* TODO::DH Need to discuss Cancel-Refund logic */
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  cancelOrderById,
};
