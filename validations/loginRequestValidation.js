const Joi = require('joi');
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string()
      .messages({
        'string.empty': 'Password is required',
        'string.base':
          'Password must be between 3 and 30 characters and can only contain letters and numbers',
      }),

  });


  const loginRequestValidate = (request)=>{
   return  loginSchema.validate(request)
  }
  
  module.exports = loginRequestValidate;