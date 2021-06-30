const httpStatus = require('http-status');
const {Timeslot} = require('../models');
const ApiError = require('../utils/ApiError');

const getTimeslotById = async (id) => {
  return Timeslot.findByPk(id);
};

const createTimeslot = async (timeslotBody) => {
  const location = {type: 'Point', coordinates: [timeslotBody.lng, timeslotBody.lat]};
  const {vanId, address, sold, amount, discount, surcharge, startTime, endTime} = timeslotBody;
  const timeslot = await Timeslot.create({vanId, address, sold, amount,
    surcharge, startTime, endTime, location, discount});
  return timeslot;
};

const queryTimeslots = async (filter, options) => {
  const timeslots = await Timeslot.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return timeslots;
};

const updateTimeslotById = async (timeslotId, updateBody) => {
  const timeslot = await getTimeslotById(timeslotId);
  if (!timeslot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeslot not found');
  }
  Object.assign(timeslot, updateBody);
  await timeslot.save();
  return timeslot;
};

/* TODO::DH is this needed? */
const deleteTimeslotById = async (timeslotId) => {
  const timeslot = await getTimeslotById(timeslotId);
  if (!timeslot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timeslot not found');
  }
  await timeslot.destroy();
  return timeslot;
};

module.exports = {
  createTimeslot,
  queryTimeslots,
  getTimeslotById,
  updateTimeslotById,
  deleteTimeslotById,
};
