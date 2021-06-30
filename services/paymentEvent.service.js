const httpStatus = require('http-status');
const { object } = require('joi');
const {PaymentEvent} = require('../models');
const ApiError = require('../utils/ApiError');

const getPaymentEventById = async (id) => {
  return PaymentEvent.findByPk(id);
};

// TODO::DH - Signature check https://stripe.com/docs/payments/handling-payment-events#signature-checking
const createPaymentEvent = async (paymentEventBody) => {
  const { data, type: eventType} =  paymentEventBody;
  const raw = data.object;
  const { id: objectId, object: objectType, amount, status } = raw;
  const paymentEvent = await PaymentEvent.create({
      eventType,
      paymentIntentId: objectType === 'payment_intent' ? id : object.payment_intent,
      objectId,
      objectType,
      amount,
      status,
      raw,
  });
  return paymentEvent;
};

const queryPaymentEvents = async (filter, options) => {
  const paymentEvents = await PaymentEvent.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 50,
  });
  return paymentEvents;
};

module.exports = {
  createPaymentEvent,
  queryPaymentEvents,
};
