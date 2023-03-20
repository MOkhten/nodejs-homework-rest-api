const express = require('express');

const { auth, ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/users');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;