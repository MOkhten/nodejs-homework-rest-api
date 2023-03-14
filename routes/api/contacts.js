const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validation, ctrlWrapper } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const validateMiddleware = validation(schemas.addSchema);

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(schemas.favoriteJoiSchema), ctrlWrapper(ctrl.updateByFavorite));

module.exports = router
