const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const orderValidation = require('../validations/order.validation');
const orderController = require('../controllers/orders.controller');

router.post('/', validate(orderValidation.createOrder), orderController.createOrder);
router.get('/', validate(orderValidation.getOrders), orderController.getOrders);
router.get('/:orderId', validate(orderValidation.getOrder), orderController.getOrder);
router.put('/:orderId', validate(orderValidation.updateOrder), orderController.updateOrder);
router.put('/:orderId/cancel', validate(orderValidation.cancelOrder), orderController.cancelOrder);

module.exports = router;
