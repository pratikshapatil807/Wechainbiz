const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
var nodemailer = require('nodemailer');
const { checkToken } = require('../../auth/token_validation');

//Add Lender acceptance

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
  (req, res) => {
    console.log(req.files);
    let data = {
      uen_number: req.body.uen_number,
      company_name: req.body.company_name,
      email_id: req.body.email_id,
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
      financier: req.body.financier,
      amount_limit: req.body.amount_limit,
      note: req.body.note,
      customer_type: req.body.customer_type,
      incorporation_date: req.body.incorporation_date,
      lenders: req.body.lenders,
      approved_loan_amount: req.body.approved_loan_amount,
      terror: req.body.terror,
      rate_of_interest: req.body.rate_of_interest,
      payment_method: req.body.payment_method,
      approval_date: req.body.approval_date,
      credit_officer: req.body.credit_officer,
      payment_due_date: req.body.payment_due_date,
      status: req.body.status,
      reason: req.body.reason,
      description: req.body.description,
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
    let sql = 'INSERT INTO lender_loan_accept SET ?';
    let query = pool.query(sql, data, (err, results) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
          user: 'smitivtechnologies.123@gmail.com',
          pass: 'smitiv@123',
        },
      });

      var mailOptions = {
        from: 'smitivtechnologies.123@gmail.com',
        to: data.email_id,
        subject: 'Loan application Status',
        text:
          'Thank you for using Wechainbiz &status=' +
          data.status +
          '&description=' +
          data.description +
          '&lenders=' +
          data.lenders,
      };

      let msg = 'Lender ' + req.body.status + ' Loan Form';
      let sql_lf =
        "UPDATE loan_form set status='" +
        req.body.status +
        "',description='" +
        req.body.description +
        "',reason='" +
        req.body.reason +
        "' WHERE id='" +
        req.body.uen_number +
        "'";
      let querystatus = pool.query(sql_lf, (err, results) => {});
      let sqllog =
        "insert into notificationlog(loan_id,description,user)values('" +
        req.body.uen_number +
        "','" +
        msg +
        "','lender')";
      let querylog = pool.query(sqllog, (err, results) => {});
      query1 = pool.query(sql_lf);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({
            status: 'Email not sent..!!',
          });
        }
      });
      return res.json({
        status: 200,
        message: 'success',
        data: data,
        message: mailOptions,
      });
    });
  }
);

//View Lender Inbox

router.get('/LenderInbox', checkToken, (req, res) => {
  let sql =
    'SELECT notificationlog.user,notificationlog.loan_id,assign_lender.status,notificationlog.description,notificationlog.created_date FROM assign_lender LEFT JOIN notificationlog ON assign_lender.uen_number WHERE user!="lender"';
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

//View Lender Inbox by id and compose email

router.post('/LenderReplay', checkToken, (req, res) => {
  let loan_id = req.body.loan_id;
  let pass = req.body.pass;
  let to = req.body.to;
  let from = req.body.from;
  let subject = req.body.subject;
  let text = req.body.text;
  let sql =
    'SELECT notificationlog.user,notificationlog.loan_id,assign_lender.status,notificationlog.description,assign_lender.lenders,notificationlog.created_date FROM assign_lender LEFT JOIN notificationlog ON assign_lender.uen_number WHERE loan_id=?';
  let query = pool.query(
    sql,
    [loan_id, pass, to, from, subject, text],
    (err, results) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
          user: req.body.from,
          pass: req.body.pass,
        },
      });

      var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({
            status: 'Email not sent..!!',
          });
        }
      });
      return res.json({
        status: 200,
        message: 'success',
        data: results,
        message: mailOptions,
      });
    }
  );
});

//View all lender acceptance

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM lender_loan_accept';
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

//View lender acceptance by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM lender_loan_accept WHERE id=' + req.params.id;

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
  let sql = 'DELETE FROM lender_loan_accept ';
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
  let sql = 'DELETE FROM lender_loan_accept WHERE id=' + req.params.id;
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
