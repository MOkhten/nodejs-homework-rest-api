const express = require("express");

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { registerSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;