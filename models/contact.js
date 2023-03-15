const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleSchemaValidationErrors } = require('../helpers');

const contactSchema = new Schema(
      {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true}
);


contactSchema.post('save', handleSchemaValidationErrors);

const Contact = model('contact', contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
favorite: Joi.boolean().required(),
})


const schemas = {
  addSchema,
  favoriteJoiSchema,
}

module.exports = {
  Contact,
  schemas,
}