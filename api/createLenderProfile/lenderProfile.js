const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//Add Lender Profile

router.post('/', checkToken, upload.single('logo'), (req, res) => {
  let data = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    mobile_no: req.body.mobile_no,
    funding_domain: req.body.funding_domain,
    min_rate_of_interest: req.body.min_rate_of_interest,
    number_of_active_funds: req.body.number_of_active_funds,
    number_of_successful_funding: req.body.number_of_successful_funding,
    min_funding_amount: req.body.min_funding_amount,
    max_funding_Amount: req.body.max_funding_Amount,
    max_terron: req.body.max_terron,
    logo: 'http:' + '//' + req.hostname + ':' + 8000 + '/' + req.file.path,
  };
  let sql = 'INSERT INTO lender_profile SET ?';
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
      data: results,
    });
  });
});

//View all Lender Profile

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM lender_profile';
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

//View Lender Profile by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM lender_profile WHERE id=' + req.params.id;
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

//Delete all data from the table

router.delete('/deleteall', checkToken, (req, res) => {
  let sql = 'DELETE FROM lender_profile ';
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
  let sql = 'DELETE FROM lender_profile WHERE id=' + req.params.id;
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
