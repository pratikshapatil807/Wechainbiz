const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { body, validationResult } = require('express-validator');
const { checkToken } = require('../../auth/token_validation');

//Add Directors Information

router.post(
  '/',
  checkToken,
  [
    body('first_name', 'first_name is required').not().isEmpty(),
    body('last_name', 'last_name is required').not().isEmpty(),
    body('role', 'role is required').not().isEmpty(),
    body('mobile_number', 'mobile_number is required').not().isEmpty(),
    body('email_id', 'email_id is required').isEmail(),
    body('date_of_birth', 'date_of_birth is required').not().isEmpty(),
    body('credit_buero_report', 'credit_buero_report is required')
      .not()
      .isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // (req, res) => {
    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role,
      mobile_number: req.body.mobile_number,
      email_id: req.body.email_id,
      date_of_birth: req.body.date_of_birth,
      credit_buero_report: req.body.credit_buero_report,
    };
    let sql = 'INSERT INTO director_information SET ?';
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
  }
);

//View all directors Information

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM director_information';
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

//View directors information by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM director_information WHERE id=' + req.params.id;
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

//View directors list

router.get('/viewdirector', checkToken, (req, res) => {
  let sql = 'SELECT first_name,role,mobile_number FROM director_information';
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
  let sql = 'DELETE FROM director_information ';
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
  let sql = 'DELETE FROM director_information WHERE id=' + req.params.id;
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
