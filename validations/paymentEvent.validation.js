const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createPaymentEvent = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    object: Joi.string().trim(),
    data: Joi.object().keys({
        object: Joi.object()
    }),
  }),
};

const getPaymentEvents = {
  query: Joi.object().keys({
    paymentIntentId: Joi.string().required(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

module.exports = {
  createPaymentEvent,
  getPaymentEvents,
};

