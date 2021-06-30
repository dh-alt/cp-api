const Joi = require('joi');
const {password} = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email({allowUnicode: false}).lowercase().trim(),
    password: Joi.string().required().custom(password),
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    role: Joi.string().required().valid('user'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email({allowUnicode: false}).lowercase().trim(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
