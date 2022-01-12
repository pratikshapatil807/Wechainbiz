const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//Add Feedback/Rating

router.post('/', checkToken, (req, res) => {
  let data = {
    borrower_name: req.body.borrower_name,
    lender_name: req.body.lender_name,
    email_id: req.body.email_id,
    rating: req.body.rating,
    remarks: req.body.remarks,
  };

  let sql = 'INSERT INTO feedback SET ?';
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

//View all feedback

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM feedback';
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

//View all feedback by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM feedback WHERE id=' + req.params.id;
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

//View feedback by email id

router.post('/Email', checkToken, (req, res) => {
  let email_id = req.body.email_id;
  let sql = 'SELECT * FROM feedback WHERE email_id=?';
  let query = pool.query(sql, [email_id], (err, results) => {
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

//View feedback list for Admin

router.get('/viewfeedback', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.id,feedback.borrower_name,feedback.lender_name,feedback.email_id,feedback.rating,feedback.remarks FROM feedback LEFT JOIN loan_form ON feedback.id= loan_form.id';
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

//View feedback for lender

router.get('/viewfeedbacklender', checkToken, (req, res) => {
  let sql =
    'SELECT loan_form.id, loan_form.product, feedback.borrower_name,feedback.email_id,feedback.rating,feedback.remarks FROM feedback LEFT JOIN loan_form ON feedback.id= loan_form.id';
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
  let sql = 'DELETE FROM feedback ';
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
  let sql = 'DELETE FROM feedback WHERE id=' + req.params.id;
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
