const Joi = require("joi");

exports.createUserSchema = Joi.object({
	firstName: Joi.string()
        .min(1)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(1)
        .max(30)
        .required(),
	email: Joi.string().max(50).email().required(),
	password: Joi.string().pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/).required(),
    phoneNumber: Joi.number().length(7).required()
});

exports.loginSchema = Joi.object({
	email: Joi.string().max(50).email().required(),
	password: Joi.string().pattern(new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/)).required(),
});
