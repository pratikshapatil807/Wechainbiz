const joi = require('@hapi/joi');

const schema = {
  borrower: joi.object({
    first_name: joi.string().max(100).required(),
    last_name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    mobile_no: joi
      .number()
      .integer()
      .min(1000000000)
      .message('Invalid mobile number')
      .max(9999999999)
      .message('Invalid mobile number')
      .required(),
    uen_no: joi.string().max(100).required(),
    ifsc_code: joi.string().max(100).required(),
    number_of_employees: joi.string().max(100).required(),
    annual_tunover: joi.string().max(100).required(),
    broker_code: joi.string().max(100).required(),
  }),
};

module.exports = schema;
