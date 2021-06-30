const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const timeslotValidation = require('../validations/timeslot.validation');
const timeslotController = require('../controllers/timeslots.controller');

router.post('/', validate(timeslotValidation.createTimeslot), timeslotController.createTimeslot);
router.get('/', validate(timeslotValidation.getTimeslots), timeslotController.getTimeslots);
router.get('/:timeslotId', validate(timeslotValidation.getTimeslot), timeslotController.getTimeslot);
router.put('/:timeslotId', validate(timeslotValidation.updateTimeslot), timeslotController.updateTimeslot);
router.delete('/:timeslotId', validate(timeslotValidation.deleteTimeslot), timeslotController.deleteTimeslot);

module.exports = router;
