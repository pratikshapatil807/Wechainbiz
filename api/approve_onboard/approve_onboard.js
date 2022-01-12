const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const { checkToken } = require('../../auth/token_validation');

//Add approve onboard application

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
    {
      name: 'loan_acceptance',
      maxCount: 1,
    },
    {
      name: 'loan_approval',
      maxCount: 1,
    },
    {
      name: 'documents',
      maxCount: 1,
    },
    {
      name: 'loan_acceptance_1',
      maxCount: 1,
    },
    {
      name: 'loan_approval_1',
      maxCount: 1,
    },
    {
      name: 'documents_1',
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log(req.files);
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
      business_characteristics: req.body.business_characteristics,
      directors_anual_income: req.body.directors_anual_income,
      year: req.body.year,
      revenue: req.body.revenue,
      profit: req.body.profit,
      customer_type: req.body.customer_type,
      incorporation_date: req.body.incorporation_date,
      lenders: req.body.lenders,
      approved_loan_amount: req.body.approved_loan_amount,
      terror: req.body.terror,
      rate_of_interest: req.body.rate_of_interest,
      date_of_approval: req.body.date_of_approval,
      date_of_disbursment: req.body.date_of_disbursment,
      processing_other_charges_wechainbiz:
        req.body.processing_other_charges_wechainbiz,
      processing_other_charges_lender: req.body.processing_other_charges_lender,

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
      loan_acceptance:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.loan_acceptance[0].path,
      loan_approval:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.loan_approval[0].path,
      documents:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.documents[0].path,
      loan_approval_1:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.loan_approval_1[0].path,
      loan_acceptance_1:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.loan_acceptance_1[0].path,
      documents_1:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.documents_1[0].path,
    };
    let sql = 'INSERT INTO approve_onboard SET ?';
    let query = pool.query(sql, data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'Some thing Went wrong..!!',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'success..!!',
        data: data,
      });
    });
  }
);

//View all approve onboard application

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM approve_onboard';
  let query = pool.query(sql, (err, results) => {
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
      data: results,
    });
  });
});

//View approve onboard application by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM approve_onboard WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
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
      data: results,
    });
  });
});

//Delete all data from the table

router.delete('/deleteall', checkToken, (req, res) => {
  let sql = 'DELETE FROM approve_onboard ';
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!!',
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
  let sql = 'DELETE FROM approve_onboard WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'Deleted success..!!',
    });
  });
});
module.exports = router;
