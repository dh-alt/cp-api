const express = require('express');
const validate = require('../middlewares/validate');
const paymentEventValidation = require('../validations/paymentEvent.validation');
const paymentEventController = require('../controllers/paymentEvents.controller');

const router = express.Router();

router.post('/', validate(paymentEventValidation.createPaymentEvent), paymentEventController.createPaymentEvent);
router.get('/', validate(paymentEventValidation.getPaymentEvents), paymentEventController.getPaymentEvents);

module.exports = router;
