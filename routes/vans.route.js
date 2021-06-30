const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const vanValidation = require('../validations/van.validation');
const vanController = require('../controllers/vans.controller');

router.post('/', validate(vanValidation.createVan), vanController.createVan);
router.get('/', validate(vanValidation.getVans), vanController.getVans);
router.get('/:vanId', validate(vanValidation.getVan), vanController.getVan);
router.put('/:vanId', validate(vanValidation.updateVan), vanController.updateVan);
router.delete('/:vanId', validate(vanValidation.deleteVan), vanController.deleteVan);

module.exports = router;
