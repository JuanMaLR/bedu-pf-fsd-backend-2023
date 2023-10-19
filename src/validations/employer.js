const Joi = require('joi');

exports.createEmployerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().max(50).email().required(),
  password: Joi.string()
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/)
    .messages({
      'string.pattern.base': `La contraseña debe contener una mayúscula, una minúscula, un caracter especial, un número y ser de al menos 10 caracteres`,
    })
    .required(),
  description: Joi.string().trim().min(5).max(2500).required(),
  website: Joi.string().trim().min(8).max(50).required(),
  logo: Joi.string().trim().min(8).max(150).required(),
  location: Joi.string().trim().min(2).max(150).required(),
});

exports.updateEmployerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    email: Joi.string().trim().max(50).email().optional(),
    password: Joi.string()
      .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,60})/)
      .messages({
        'string.pattern.base': `La contraseña debe contener una mayúscula, una minúscula, un caracter especial, un número y ser de al menos 10 caracteres`,
      })
      .optional(),
    description: Joi.string().trim().min(5).max(2500).optional(),
    website: Joi.string().trim().min(8).max(50).optional(),
    logo: Joi.string().trim().min(8).max(150).optional(),
    location: Joi.string().trim().min(2).max(150).optional(),
});

exports.paramsSchema = Joi.object({
	id: Joi.number().required(),
});
