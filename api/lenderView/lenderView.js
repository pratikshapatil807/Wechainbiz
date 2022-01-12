const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//@route POST api/preschool
//@desc  Add  school Data
//access  Public

router.post('/', checkToken, (req, res) => {
  let data = {
    uen_number: req.body.uen_number,
    company_name: req.body.company_name,
    number_of_employees: req.body.number_of_employees,
    business_type: req.body.business_type,
    product: req.body.product,
    preffered_terror: req.body.preffered_terror,
    expected_loan_amount: req.body.expected_loan_amount,
    collaterals: req.body.collaterals,
    industry_type: req.body.industry_type,
    avg_monthly_balance: req.body.avg_monthly_balance,
    business_characteristics: req.body.business_characteristics,
    directors_anual_income: req.body.directors_anual_income,
    year: req.body.year,
    revenue: req.body.revenue,
    profit: req.body.profit,
    customer_type: req.body.customer_type,
    documents_required: req.body.documents_required,
  };
  let sql = 'INSERT INTO lender_view SET ?';
  let query = pool.query(sql, data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success..!!',
      data: data,
    });
  });
});

module.exports = router;
