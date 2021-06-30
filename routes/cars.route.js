const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const carValidation = require('../validations/car.validation');
const carController = require('../controllers/cars.controller');

router.post('/', validate(carValidation.createCar), carController.createCar);
router.get('/', validate(carValidation.getCars), carController.getCars);
router.get('/:carId', validate(carValidation.getCar), carController.getCar);
router.put('/:carId', validate(carValidation.updateCar), carController.updateCar);
router.delete('/:carId', validate(carValidation.deleteCar), carController.deleteCar);

module.exports = router;
