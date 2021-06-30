const httpStatus = require('http-status');
const {Van} = require('../models');
const ApiError = require('../utils/ApiError');

const getVanById = async (id) => {
  return Van.findByPk(id);
};

const createVan = async (vanBody) => {
  const van = await Van.create(vanBody);
  return van;
};

const queryVans = async (filter, options) => {
  const vans = await Van.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return vans;
};

const updateVanById = async (vanId, updateBody) => {
  const van = await getVanById(vanId);
  if (!van) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Van not found');
  }
  Object.assign(van, updateBody);
  await van.save();
  return van;
};

const deleteVanById = async (vanId) => {
  const van = await getVanById(vanId);
  if (!van) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Van not found');
  }
  await van.destroy();
  return van;
};

module.exports = {
  createVan,
  queryVans,
  getVanById,
  updateVanById,
  deleteVanById,
};
