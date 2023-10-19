const Joi = require('joi');

exports.createPostSchema = Joi.object({
  positionName: Joi.string().trim().min(5).max(50).required(),
  description: Joi.string().trim().min(5).max(2500).required(),
  requirements: Joi.string().trim().min(5).max(2500).required(),
  responsibilities: Joi.string().trim().min(5).max(2500).required(),
  location: Joi.string().trim().min(2).max(150).required(),
  isActive: Joi.boolean().required(),
  positionTypeId: Joi.number().required(),
  employerId: Joi.number().required()
});

exports.updatePostSchema = Joi.object({
    positionName: Joi.string().trim().min(5).max(50).optional(),
    description: Joi.string().trim().min(5).max(2500).optional(),
    requirements: Joi.string().trim().min(5).max(2500).optional(),
    responsibilities: Joi.string().trim().min(5).max(2500).optional(),
    location: Joi.string().trim().min(2).max(150).optional(),
    isActive: Joi.boolean().optional(),
    positionTypeId: Joi.number().optional(),
    employerId: Joi.number().optional()
});

exports.paramsSchema = Joi.object({
  id: Joi.number().required(),
});
