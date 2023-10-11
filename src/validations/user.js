const Joi = require('joi');

exports.createUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  email: Joi.string().max(50).email().required(),
  password: Joi.string()
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/)
    .messages({
      'string.pattern.base': `La contraseña debe contener una mayúscula, una minúscula, un caracter especial, un número y ser de al menos 10 caracteres`,
    })
    .required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

exports.updateUserSchema = Joi.object({
  firstName: Joi.string().min(1).max(30).optional(),
  lastName: Joi.string().min(1).max(30).optional(),
  email: Joi.string().max(50).email().optional(),
  password: Joi.string()
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/)
    .messages({
      'string.pattern.base': `La contraseña debe contener una mayúscula, una minúscula, un caracter especial, un número y ser de al menos 10 caracteres`,
    })
    .optional(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().max(50).email().required(),
  password: Joi.string()
    .pattern(new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/))
    .required(),
});
