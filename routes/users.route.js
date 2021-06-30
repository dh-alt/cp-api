const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.post('/', validate(userValidation.createUser), userController.createUser);
router.post('/register', validate(userValidation.createUser), userController.registerUser);
router.get('/', validate(userValidation.getUsers), userController.getUsers);
router.get('/:userId', validate(userValidation.getUser), userController.getUser);
router.put('/:userId', validate(userValidation.updateUser), userController.updateUser);
router.delete('/:userId', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
