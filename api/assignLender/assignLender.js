const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
var nodemailer = require('nodemailer');
const { checkToken } = require('../../auth/token_validation');

//Add assign lender

router.post('/', checkToken, (req, res) => {
  let data = {
    reasign_to_subadmin: req.body.reasign_to_subadmin,
    sub_admin: req.body.sub_admin,
    uen_number: req.body.uen_number,
    email_id: req.body.email_id,
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
    incorporation_date: req.body.incorporation_date,
    lenders: req.body.lenders,
    status: req.body.status,
    reason: req.body.reason,
    description: req.body.description,
  };

  let sql = 'INSERT INTO assign_lender SET ?';
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

    let msg = 'Admin ' + req.body.status + ' Loan Form';
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
      "','admin')";
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
});

//View User Inbox

router.get('/UserInbox', checkToken, (req, res) => {
  let sql =
    'SELECT notificationlog.user,notificationlog.loan_id,assign_lender.status,notificationlog.description,assign_lender.lenders,notificationlog.created_date FROM assign_lender LEFT JOIN notificationlog ON assign_lender.uen_number WHERE user!="Borrower"';
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

//View User Inbox by id and compose email

router.post('/UserReplay', checkToken, (req, res) => {
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

//View all assign lender

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM assign_lender';
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

//View assign lender by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM assign_lender WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'Some thing went wrong..!!',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'success..!!',
      data: results,
    });
  });
});

//View loan list (Lender)

router.get('/data', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.id, loan_form.create_date, assign_lender.lenders,loan_form.product,loan_form.preffered_terror, loan_form.expected_loan_amount, assign_lender.reason, assign_lender.status FROM assign_lender LEFT JOIN loan_form ON assign_lender.id= loan_form.id';
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

//View loan list Borrower

router.get('/admin_data', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.id, loan_form.create_date, gen_reg.company,assign_lender.lenders,loan_form.product, loan_form.expected_loan_amount,loan_form.preffered_terror, assign_lender.status FROM((loan_form INNER JOIN assign_lender ON loan_form.id = assign_lender.id) INNER JOIN gen_reg ON assign_lender.id = gen_reg.id)';
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

//View revert application

router.get('/revert_application', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.uen_number,loan_form.company_name,loan_form.number_of_employees,loan_form.business_type,loan_form.product,loan_form.preffered_terror,loan_form.expected_loan_amount,loan_form.collaterals,loan_form.industry_type,loan_form.avg_monthly_balance,loan_form.business_characteristics,loan_form.directors_anual_income,loan_form.year,loan_form.revenue,loan_form.profit,loan_form.customer_type,loan_form.incorporation_date,assign_lender.reason FROM loan_form LEFT JOIN assign_lender ON loan_form.id= assign_lender.id';
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

//View revert application by id

router.get('/revert_application/:id', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.uen_number,loan_form.company_name,loan_form.number_of_employees,loan_form.business_type,loan_form.product,loan_form.preffered_terror,loan_form.expected_loan_amount,loan_form.collaterals,loan_form.industry_type,loan_form.avg_monthly_balance,loan_form.business_characteristics,loan_form.directors_anual_income,loan_form.year,loan_form.revenue,loan_form.profit,loan_form.customer_type,loan_form.incorporation_date,assign_lender.reason FROM loan_form LEFT JOIN assign_lender ON loan_form.id= assign_lender.id WHERE loan_form.id=' +
    req.params.id;
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

//View loan list of Borrower

router.get('/lenderLoanView', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.id,loan_form.create_date,loan_form.product,loan_form.company_name,loan_form.expected_loan_amount,assign_lender.status  FROM loan_form LEFT JOIN assign_lender ON loan_form.id= assign_lender.id';
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
  let sql = 'DELETE FROM assign_lender ';
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
  let sql = 'DELETE FROM assign_lender WHERE id=' + req.params.id;
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
