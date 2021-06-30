const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {carService} = require('../services');
const logger = require('../config/logger');

const createCar = catchAsync(async (req, res) => {
  const car = await carService.createCar(req.body);
  res.status(httpStatus.CREATED).send(car);
});

const getCars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  logger.info(`filter ${JSON.stringify(filter)}`);
  logger.info(`options ${JSON.stringify(options)}`);
  const result = await carService.queryCars(filter, options);
  res.send(result);
});

const getCar = catchAsync(async (req, res) => {
  const car = await carService.getCarById(req.params.carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  res.send(car);
});

const updateCar = catchAsync(async (req, res) => {
  const car = await carService.updateCarById(req.params.carId, req.body);
  res.send(car);
});

const deleteCar = catchAsync(async (req, res) => {
  await carService.deleteCarById(req.params.carId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
};
