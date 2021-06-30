const httpStatus = require('http-status');
const {PromoCode} = require('../models');
const ApiError = require('../utils/ApiError');

const getPromoCodeById = async (id) => {
  return PromoCode.findByPk(id);
};

const createPromoCode = async (promoCodeBody) => {
  const promoCode = await PromoCode.create(promoCodeBody);
  return promoCode;
};

const queryPromoCodes = async (filter, options) => {
  const promoCodes = await PromoCode.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return promoCodes;
};

const updatePromoCodeById = async (promoCodeId, updateBody) => {
  const promoCode = await getPromoCodeById(promoCodeId);
  if (!promoCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PromoCode not found');
  }
  Object.assign(promoCode, updateBody);
  await promoCode.save();
  return promoCode;
};

module.exports = {
  createPromoCode,
  queryPromoCodes,
  getPromoCodeById,
  updatePromoCodeById,
};
