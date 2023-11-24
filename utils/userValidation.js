const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.min': 'name must be at least 3 characters long',
      'string.max': 'name must be no more than 30 characters long',
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .messages({
        'string.empty': 'Password is required',
        'string.pattern.base':
          'Password must be between 3 and 30 characters and can only contain letters and numbers',
      }),

  });
  
  module.exports = userSchema;