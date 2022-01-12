const joi = require('@hapi/joi');

const schema = {
  uploadDocuments: joi.object({
    company_name: joi.string().max(100).required(),
    loan_id: joi.string().max(100).required(),
    create_date: joi.string().email().required(),
    product: joi.string().max(100).required(),
    expected_loan_amount: joi.string().max(100).required(),
    preffered_terror: joi.string().max(100).required(),
    status: joi.string().max(100).required(),
    funders_selected: joi.string().max(100).required(),
    sme_contact_person: joi.string().max(100).required(),
    description: joi.string().max(100).required(),
    changed_status: joi.string().max(100).required(),
  }),
};

module.exports = schema;
