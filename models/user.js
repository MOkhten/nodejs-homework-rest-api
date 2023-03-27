const { Schema, model } = require('mongoose');
const Joi = require("joi");
const bcript = require('bcryptjs');

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true
    },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
    this.password = bcript.hashSync(password, bcript.genSaltSync(10));
}

const User = model('user', userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const joiLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

module.exports = {
    User,
    registerSchema,
    joiLoginSchema,
}