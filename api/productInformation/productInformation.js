const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//Add Product Information

router.post('/', checkToken, (req, res) => {
  let data = {
    product_name: req.body.product_name,
    repayment_type: req.body.repayment_type,
    currency: req.body.currency,
    product_description: req.body.product_description,
    facility_start_date: req.body.facility_start_date,
    expiration_date: req.body.expiration_date,
    show_margin: req.body.show_margin,
    margin: req.body.margin,
    loan_period: req.body.loan_period,
    choose_funder: req.body.choose_funder,
    terms_conditions: req.body.terms_conditions,
  };
  let sql = 'INSERT INTO product_information SET ?';
  let query = pool.query(sql, data, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!!',
      });
    }
    return res.json({
      status: 1,
      message: 'success..!!',
      data: data,
    });
  });
});

//View all product information

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM product_information';
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

//View product information by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM product_information WHERE id=' + req.params.id;
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
  let sql = 'DELETE FROM product_information ';
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
  let sql = 'DELETE FROM product_information WHERE id=' + req.params.id;
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
