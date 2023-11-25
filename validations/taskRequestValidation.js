const Joi = require('joi');

const taskSchemaValidation = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
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