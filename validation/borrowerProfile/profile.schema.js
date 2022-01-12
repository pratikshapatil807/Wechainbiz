const joi = require('@hapi/joi');

const schema = {
  profile: joi.object({
    director_first_name: joi.string().max(100).required(),
    director_last_name: joi.string().max(100).required(),
    uen_no: joi.string().max(100).required(),
    industry_isic_code: joi.string().max(100).required(),
    number_of_employees: joi.string().max(100).required(),
    annual_tun_over: joi.string().max(100).required(),
    is_singapore_reg_company: joi.string().max(100).required(),
    load_shareholding: joi.string().max(100).required(),
    history: joi.string().max(100).required(),
    company_description: joi.string().max(100).required(),
    business_description: joi.string().max(100).required(),
    email: joi.string().email().required(),
    mobile_number: joi
      .number()
      .integer()
      .min(1000000000)
      .message('Invalid mobile number')
      .max(9999999999)
      .message('Invalid mobile number')
      .required(),
    website: joi.string().max(100).required(),
  }),
};

module.exports = schema;
