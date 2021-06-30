const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {timeslotService} = require('../services');
const logger = require('../config/logger');

const createTimeslot = catchAsync(async (req, res) => {
  const timeslot = await timeslotService.createTimeslot(req.body);
  res.status(httpStatus.CREATED).send(timeslot);
});

const getTimeslots = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  logger.info(`filter ${JSON.stringify(filter)}`);
  logger.info(`options ${JSON.stringify(options)}`);
  const result = await timeslotService.queryTimeslots(filter, options);
  res.send(result);
});

const getTimeslot = catchAsync(async (req, res) => {
  const timeslot = await timeslotService.getTimeslotById(req.params.timeslotId);
  if (!timeslot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeslot not found');
  }
  res.send(timeslot);
});

const updateTimeslot = catchAsync(async (req, res) => {
  const timeslot = await timeslotService.updateTimeslotById(req.params.timeslotId, req.body);
  res.send(timeslot);
});

const deleteTimeslot = catchAsync(async (req, res) => {
  await timeslotService.deleteTimeslotById(req.params.timeslotId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTimeslot,
  getTimeslots,
  getTimeslot,
  updateTimeslot,
  deleteTimeslot,
};
