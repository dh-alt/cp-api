const Joi = require('joi');
const {password, objectId} = require('./custom.validation');

const createVan = {
  body: Joi.object().keys({
    name: Joi.string().required().uppercase().trim(),
    license: Joi.string().trim(),
    make: Joi.string().trim(),
    model: Joi.string().trim(),
    year: Joi.string().trim(),
    status: Joi.string().trim(),
  }),
};

const getVans = {
  query: Joi.object().keys({
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.string(),
  }),
};

const getVan = {
  params: Joi.object().keys({
    vanId: Joi.string().custom(objectId),
  }),
};

const updateVan = {
  params: Joi.object().keys({
    vanId: Joi.required().custom(objectId),
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

const deleteVan = {
  params: Joi.object().keys({
    vanId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createVan,
  getVans,
  getVan,
  updateVan,
  deleteVan,
};
