const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//Add Repayment

router.post('/', checkToken, (req, res) => {
  let data = {
    lender: req.body.lender,
    product: req.body.product,
    company_name: req.body.company_name,
    loan_amount: req.body.loan_amount,
    remaining_amount: req.body.remaining_amount,
    repayment_type: req.body.repayment_type,
    due_date: req.body.due_date,
    amount_to_be_paid: req.body.amount_to_be_paid,
    d_5_day: req.body.d_5_day,
    d_2_day: req.body.d_2_day,
    payment_status: req.body.payment_status,
  };
  let sql = 'INSERT INTO replayment SET ?';
  let query = pool.query(sql, data, (err, results) => {
    if (err) throw err;
    return res.json({
      status: 1,
      message: 'success',
      data: data,
    });
  });
});

//View All repayment

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM replayment';
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'database connection error',
      });
    }
    return res.status(200).json({
      status: 200,
      message: ' success',
      data: results,
    });
  });
});

//View Repayment details by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM replayment WHERE id=' + req.params.id;
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'database connection error',
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
  let sql = 'DELETE FROM replayment ';
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
  let sql = 'DELETE FROM replayment WHERE id=' + req.params.id;
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
