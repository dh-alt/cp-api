const httpStatus = require('http-status');
const {Car} = require('../models');
const ApiError = require('../utils/ApiError');

const getCarById = async (id) => {
  return Car.findByPk(id);
};

const createCar = async (carBody) => {
  const car = await Car.create(carBody);
  return car;
};

const queryCars = async (filter, options) => {
  const cars = await Car.findAll({where: filter}, {
    offset: options.offset || 0,
    limit: options.limit || 5,
  });
  return cars;
};

const updateCarById = async (carId, updateBody) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  Object.assign(car, updateBody);
  await car.save();
  return car;
};

const deleteCarById = async (carId) => {
  const car = await getCarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  await car.destroy();
  return car;
};

module.exports = {
  createCar,
  queryCars,
  getCarById,
  updateCarById,
  deleteCarById,
};
