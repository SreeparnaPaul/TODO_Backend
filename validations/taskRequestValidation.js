const Joi = require('joi');

const taskSchemaValidation = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  createdBy: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.empty': 'CreatedBy is required',
    'any.required': 'CreatedBy is required',
    'string.pattern.base': 'CreatedBy must be a valid ObjectId',
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required',
  }),
});

const taskRequestValidate = (request) => {
  return taskSchemaValidation.validate(request);
};

module.exports = {taskRequestValidate};