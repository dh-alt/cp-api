const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createCar = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    license: Joi.string().trim(),
    make: Joi.string().trim(),
    model: Joi.string().trim(),
    year: Joi.string().trim(),
    status: Joi.string().trim(),
  }),
};

const getCars = {
  query: Joi.object().keys({
    userId: Joi.number().required(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

const getCar = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
};

const updateCar = {
  params: Joi.object().keys({
    carId: Joi.required().custom(objectId),
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

const deleteCar = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
};
