const joi = require('@hapi/joi');

const schema = {
  loanApplication: joi.object({
    uen_number: joi.string().max(100).required(),
    company_name: joi.string().max(100).required(),
    number_of_employees: joi.string().max(100).required(),
    business_type: joi.string().max(100).required(),
    product: joi.string().max(100).required(),
    preffered_terror: joi.string().max(100).required(),
    expected_loan_amount: joi.string().max(100).required(),
    collaterals: joi.string().max(100).required(),
    industry_type: joi.string().max(100).required(),
    avg_monthly_balance: joi.string().max(100).required(),
    business_characteristics: joi.string().max(100).required(),
    directors_anual_income: joi.string().max(100).required(),
    year: joi.string().max(100).required(),
    revenue: joi.string().max(100).required(),
    profit: joi.string().max(100).required(),
    financier: joi.string().max(100).required(),
    faculty_type: joi.string().max(100).required(),
    amount_limit: joi.string().max(100).required(),
    outstanding_amount: joi.string().max(100).required(),
    monthly_installment: joi.string().max(100).required(),
    terror: joi.string().max(100).required(),
    start_date: joi.string().max(100).required(),
    end_date: joi.string().max(100).required(),
    security: joi.string().max(100).required(),
    latest_security_value: joi.string().max(100).required(),
    customer_type: joi.string().max(100).required(),
    incorporation_date: joi.string().max(100).required(),
    lender_wishlist: joi.string().max(100).required(),
    how_you_heard_this: joi.string().max(100).required(),
  }),
};

module.exports = schema;
