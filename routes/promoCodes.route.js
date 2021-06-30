const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const promoCodeValidation = require('../validations/promoCode.validation');
const promoCodeController = require('../controllers/promoCodes.controller');

router.post('/', validate(promoCodeValidation.createPromoCode), promoCodeController.createPromoCode);
router.get('/', validate(promoCodeValidation.getPromoCodes), promoCodeController.getPromoCodes);
router.get('/:promoCodeId', validate(promoCodeValidation.getPromoCode), promoCodeController.getPromoCode);
router.put('/:promoCodeId', validate(promoCodeValidation.updatePromoCode), promoCodeController.updatePromoCode);

module.exports = router;
