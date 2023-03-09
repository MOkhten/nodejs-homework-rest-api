const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas/contacts');

const validateMiddleware = validation(contactSchema);

// const {getAll, getById, add, updateById, removeById } = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router
