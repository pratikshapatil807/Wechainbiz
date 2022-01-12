const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//@route POST api/preschool
//@desc  Add  school Data
//access  Public

router.post('/', checkToken, (req, res) => {
  let data = {
    company: req.body.company,
    loan_id: req.body.company,
    loan_application_date: req.body.loan_application_date,
    product: req.body.product,
    expected_loan_amount: req.body.expected_loan_amount,
    preffered_terror: req.body.preffered_terror,
    application_status: req.body.application_status,
    funders_selected: req.body.funders_selected,
    sme_contact_person: req.body.sme_contact_person,
    documents_needed: req.body.documents_needed,
  };
  let sql = 'INSERT INTO admin_gen_reg SET ?';
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
