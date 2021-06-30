const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {promoCodeService} = require('../services');
const logger = require('../config/logger');

const createPromoCode = catchAsync(async (req, res) => {
  const promoCode = await promoCodeService.createPromoCode(req.body);
  res.status(httpStatus.CREATED).send(promoCode);
});

const getPromoCodes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'invalid']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  logger.info(`filter ${JSON.stringify(filter)}`);
  logger.info(`options ${JSON.stringify(options)}`);
  const result = await promoCodeService.queryPromoCodes(filter, options);
  res.send(result);
});

const getPromoCode = catchAsync(async (req, res) => {
  const promoCode = await promoCodeService.getPromoCodeById(req.params.promoCodeId);
  if (!promoCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PromoCode not found');
  }
  res.send(promoCode);
});

const updatePromoCode = catchAsync(async (req, res) => {
  const promoCode = await promoCodeService.updatePromoCodeById(req.params.promoCodeId, req.body);
  res.send(promoCode);
});

module.exports = {
  createPromoCode,
  getPromoCodes,
  getPromoCode,
  updatePromoCode,
};
