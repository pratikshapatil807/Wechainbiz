const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const { body, validationResult } = require('express-validator');
const { checkToken } = require('../../auth/token_validation');

//Add Active Loan Application

router.post(
  '/',
  checkToken,
  upload.fields([
    {
      name: 'acar_document',
      maxCount: 1,
    },
    {
      name: 'cbs_document',
      maxCount: 1,
    },
    {
      name: 'income_statement',
      maxCount: 1,
    },
    {
      name: 'bank_statement',
      maxCount: 1,
    },
    {
      name: 'banking_facilities',
      maxCount: 1,
    },
    {
      name: 'latest_management_accounts',
      maxCount: 1,
    },

    {
      name: 'gst_statement',
      maxCount: 1,
    },
    {
      name: 'invoices_and_past_invoices',
      maxCount: 1,
    },
    {
      name: 'directors_document',
      maxCount: 1,
    },
    {
      name: 'directors_nric',
      maxCount: 1,
    },
    {
      name: 'directors_notice',
      maxCount: 1,
    },
    {
      name: 'directors_credit_buerau',
      maxCount: 1,
    },
  ]),
  [
    body('uen_number', 'uen_number is required').not().isEmpty(),
    body('company_name', 'company_name is required').not().isEmpty(),
    body('number_of_employees', 'number_of_employees is required')
      .not()
      .isEmpty(),
    body('business_type', 'business_type is required').not().isEmpty(),
    body('product', 'product is required').not().isEmpty(),
    body('preffered_terror', 'preffered_terror is required').not().isEmpty(),
    body(
      'directors_credit_buerau',
      'directors_credit_buerau is not required'
    ).optional(),
    body('expected_loan_amount', 'expected_loan_amount is required')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
      number_of_directors: req.body.number_of_directors,
      directors_anual_income: req.body.directors_anual_income,
      business_characteristics: req.body.business_characteristics,
      year: req.body.year,
      revenue: req.body.revenue,
      profit: req.body.profit,
      financier: req.body.financier,
      amount: req.body.amount,
      note: req.body.note,
      status: req.body.status,
      approved_loan_amount: req.body.approved_loan_amount,
      rate_of_interest: req.body.rate_of_interest,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      security: req.body.security,
      latest_security_value: req.body.latest_security_value,
      terror: req.body.terror,
      email_id: req.body.email_id,
      acar_document:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.acar_document[0].path,
      cbs_document:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.cbs_document[0].path,
      income_statement:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.income_statement[0].path,
      bank_statement:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.bank_statement[0].path,
      banking_facilities:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.banking_facilities[0].path,
      latest_management_accounts:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.latest_management_accounts[0].path,

      gst_statement:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.gst_statement[0].path,
      invoices_and_past_invoices:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.invoices_and_past_invoices[0].path,
      directors_document:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.directors_document[0].path,
      directors_nric:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.directors_nric[0].path,
      directors_notice:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.directors_notice[0].path,
      directors_credit_buerau:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.directors_credit_buerau[0].path,
    };
    let sql = 'INSERT INTO active_loan SET ?';
    let query = pool.query(sql, data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'Some thing went wrong ..!!',
          error: err,
        });
      }
      res.status(200).json({
        status: 200,
        message: 'Success..!!',
        data: data,
      });
    });
  }
);

//View all active loan application

router.get('/', checkToken, getAllProducts);
//Pagination
function getAllProducts(req, res) {
  // limit as 10
  const limit = 10;
  // page number
  const page = req.query.page;
  // calculate offset
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
  const sql = 'select * from active_loan limit ' + limit + ' OFFSET ' + offset;
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // if (err) throw error;
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'some thing went wrong..!!',
          error: err,
        });
      }
      // create payload
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        Data: results,
      };
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = 'Products for page ' + page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    });
  });
}

//View all active loan application by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM active_loan WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!!',
      });
    }
    res.status(200).json({
      status: 200,
      message: 'success..!!',
      data: results,
    });
  });
});

//View active loan application by Email

router.post('/Email', checkToken, (req, res) => {
  let email_id = req.body.email_id;
  let sql = 'SELECT * FROM active_loan WHERE email_id=?';
  let query = pool.query(sql, [email_id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'Some thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: ' success',
      data: results,
    });
  });
});

//Delete all data from the table

router.delete('/deleteall', checkToken, (req, res) => {
  let sql = 'DELETE FROM active_loan ';
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'sone thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Deleted success..!!',
    });
  });
});

//Delete particular data from the table

router.delete('/deleteall/:id', checkToken, (req, res) => {
  let sql = 'DELETE FROM active_loan WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'sone thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Deleted success..!!',
    });
  });
});

module.exports = router;
