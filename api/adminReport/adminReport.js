const pool = require('../../config/database');
const router = require('express').Router();
var nodemailer = require('nodemailer');
const { checkToken } = require('../../auth/token_validation');

//Admin report by status of lon application

router.post('/adminReportbystatus', checkToken, (req, res) => {
  let status = req.body.status;
  let sql =
    'SELECT id, create_date,lender_wishlist,product, expected_loan_amount FROM  loan_form  WHERE status= ?';
  let query = pool.query(sql, [status], (err, results) => {
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
      data: results,
    });
  });
});

//Admin report by Lender type

router.post('/adminReportbylender', checkToken, (req, res) => {
  let lender_wishlist = req.body.lender_wishlist;
  let sql =
    'SELECT id, create_date,lender_wishlist,product, expected_loan_amount FROM  loan_form  WHERE lender_wishlist= ?';
  let query = pool.query(sql, [lender_wishlist], (err, results) => {
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

//Admin report by Month

router.post('/adminReportbymonth', checkToken, (req, res) => {
  let month = req.body.month;
  let sql =
    'SELECT id, create_date,lender_wishlist,product, expected_loan_amount FROM  loan_form  WHERE MONTH(create_date) = ?';
  let query = pool.query(sql, [month], (err, results) => {
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

//Admin report by Year

router.post('/adminReportbyYear', checkToken, (req, res) => {
  let year = req.body.year;
  let sql =
    'SELECT id, create_date,lender_wishlist,product, expected_loan_amount FROM  loan_form  WHERE YEAR(create_date) = ?';
  let query = pool.query(sql, [year], (err, results) => {
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

//Total Number of Leders Registered

router.get('/numberOfRegisteredLenders', checkToken, (req, res) => {
  let sql = 'SELECT COUNT(*) FROM funder_reg';
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

//Total Number of Loan Applied

router.get('/numberOfLoanApplied', checkToken, (req, res) => {
  let sql = 'SELECT COUNT(*) FROM loan_form';
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

//Total Number of Loan Applied

router.get('/SumOfLoanAmount', checkToken, (req, res) => {
  let sql =
    'SELECT SUM(expected_loan_amount) AS TotalLoanAmount FROM loan_form';
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

//Admin report by status of lon application

router.post('/countOfStatus', checkToken, (req, res) => {
  let status = req.body.status;
  let sql = 'SELECT COUNT(*) FROM loan_form WHERE status= ?';
  let query = pool.query(sql, [status], (err, results) => {
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

//View Admin Inbox

router.get('/AdminInbox', checkToken, (req, res) => {
  let sql =
    'SELECT notificationlog.user,notificationlog.loan_id,assign_lender.status,notificationlog.description,assign_lender.lenders,notificationlog.created_date FROM assign_lender LEFT JOIN notificationlog ON assign_lender.uen_number ';
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

router.post('/AdminReplay', checkToken, (req, res) => {
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
module.exports = router;
