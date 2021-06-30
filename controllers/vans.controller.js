const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {vanService} = require('../services');
const logger = require('../config/logger');

const createVan = catchAsync(async (req, res) => {
  const van = await vanService.createVan(req.body);
  res.status(httpStatus.CREATED).send(van);
});

const getVans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  logger.info(`filter ${JSON.stringify(filter)}`);
  logger.info(`options ${JSON.stringify(options)}`);
  const result = await vanService.queryVans(filter, options);
  res.send(result);
});

const getVan = catchAsync(async (req, res) => {
  const van = await vanService.getVanById(req.params.vanId);
  if (!van) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Van not found');
  }
  res.send(van);
});

const updateVan = catchAsync(async (req, res) => {
  const van = await vanService.updateVanById(req.params.vanId, req.body);
  res.send(van);
});

const deleteVan = catchAsync(async (req, res) => {
  await vanService.deleteVanById(req.params.vanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createVan,
  getVans,
  getVan,
  updateVan,
  deleteVan,
};
