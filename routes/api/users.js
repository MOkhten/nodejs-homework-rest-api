const express = require('express');

const { auth, upload, ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/users');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/avatars', auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;