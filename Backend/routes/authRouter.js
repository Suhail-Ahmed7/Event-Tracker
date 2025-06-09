const express = require('express');
const router = express.Router();

const signup = require('../controllers/signupController');
const login = require('../controllers/loginController');

const { signupValidation, loginValidation } = require('../middleware/authValidation');

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
