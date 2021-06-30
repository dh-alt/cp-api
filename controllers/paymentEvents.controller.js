const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {paymentEventService} = require('../services');
const logger = require('../config/logger');

const createPaymentEvent = catchAsync(async (req, res) => {
  const paymentEvent = await paymentEventService.createPaymentEvent(req.body);
  res.status(httpStatus.CREATED).send(paymentEvent);
});

const getPaymentEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'paymentIntentId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  logger.info(`filter ${JSON.stringify(filter)}`);
  logger.info(`options ${JSON.stringify(options)}`);
  const result = await paymentEventService.queryPaymentEvents(filter, options);
  res.send(result);
});

module.exports = {
  createPaymentEvent,
  getPaymentEvents,
};
