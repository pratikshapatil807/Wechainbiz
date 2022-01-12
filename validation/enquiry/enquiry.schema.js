const joi = require('@hapi/joi');

const schema = {
  enquiry: joi.object({
    first_name: joi.string().max(100).required(),
    last_name: joi.string().max(100).required(),
    company_name: joi.string().max(100).required(),
    uen_number: joi.string().max(100).required(),
    ifsc_code: joi.string().max(100).required(),
    no_of_employess: joi.string().max(100).required(),
    annual_tunover: joi.string().max(100).required(),
    email: joi.string().email().required(),
    mobile_no: joi
      .number()
      .integer()
      .min(1000000000)
      .message('Invalid mobile number')
      .max(9999999999)
      .message('Invalid mobile number')
      .required(),
    enquiry_title: joi.string().max(100).required(),
    discription: joi.string().max(100).required(),
  }),
};

module.exports = schema;
