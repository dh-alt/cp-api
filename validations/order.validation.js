const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    timeslotId: Joi.number().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    address: Joi.string().trim(),
    promoCode: Joi.string().trim(),
  }),
};

const createGuestOrder = {
  body: Joi.object().keys({
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    phone: Joi.string().required().trim(),
    timeslotId: Joi.number().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    address: Joi.string().trim(),
    promoCode: Joi.string().trim(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
      .keys({
        name: Joi.string().uppercase().trim(),
        license: Joi.string().trim(),
        make: Joi.string().trim(),
        model: Joi.string().trim(),
        year: Joi.string().trim(),
        status: Joi.string().trim(),
      })
      .min(1),
};

const cancelOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  cancelOrder,
};
