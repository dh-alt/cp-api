const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createPromoCode = {
  body: Joi.object().keys({
    code: Joi.string().trim().required(),
    discountAmount: Joi.number().integer().required(),
    count: Joi.number().integer(),
    used: Joi.number().integer(),
    description: Joi.string().trim(),
    expires: Joi.date().timestamp('unix'),
    invalid: Joi.boolean(),
  }),
};

const getPromoCodes = {
  query: Joi.object().keys({
    code: Joi.string().trim().required(),
    invalid: Joi.boolean(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPromoCode = {
  params: Joi.object().keys({
    promoCodeId: Joi.string().custom(objectId),
  }),
};

const updatePromoCode = {
  params: Joi.object().keys({
    promoCodeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
      .keys({
        invalid: Joi.boolean(),
    })
      .min(1),
};

module.exports = {
  createPromoCode,
  getPromoCodes,
  getPromoCode,
  updatePromoCode,
};
