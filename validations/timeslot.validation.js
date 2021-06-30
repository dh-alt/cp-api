const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createTimeslot = {
  body: Joi.object().keys({
    vanId: Joi.number().required(),
    address: Joi.string().trim(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    sold: Joi.boolean(),
    amount: Joi.number().integer().required(),
    discount: Joi.number().integer(),
    surcharge: Joi.number().integer(),
    startTime: Joi.number(),
    endTime: Joi.number(),
  }),
};

const getTimeslots = {
  query: Joi.object().keys({
    vanId: Joi.number().integer(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

const getTimeslot = {
  params: Joi.object().keys({
    vanId: Joi.string().custom(objectId),
  }),
};

const updateTimeslot = {
  params: Joi.object().keys({
    timeslotId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
      .keys({
        sold: Joi.boolean(),
        amount: Joi.number().integer(),
        discount: Joi.number().integer(),
        surcharge: Joi.number().integer(),
      })
      .min(1),
};

const deleteTimeslot = {
  params: Joi.object().keys({
    vanId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTimeslot,
  getTimeslots,
  getTimeslot,
  updateTimeslot,
  deleteTimeslot,
};
