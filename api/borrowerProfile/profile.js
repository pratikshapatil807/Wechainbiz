const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//View registered borrower profile by email

router.post('/email', checkToken, (req, res) => {
  let email = req.body.email;
  var sql = "select * from register where email='" + email + "'";
  console.log(sql);
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

//Add borrower Profile

router.post('/', checkToken, (req, res) => {
  let data = {
    director_first_name: req.body.director_first_name,
    director_last_name: req.body.director_last_name,
    company: req.body.company,
    uen_number: req.body.uen_number,
    industry_isic_code: req.body.industry_isic_code,
    number_of_employees: req.body.number_of_employees,
    annual_tun_over: req.body.annual_tun_over,
    is_singapore_reg_company: req.body.is_singapore_reg_company,
    load_shareholding: req.body.load_shareholding,
    history: req.body.history,
    company_description: req.body.company_description,
    business_description: req.body.business_description,
    contact_person: req.body.contact_person,
    email: req.body.email,
    mobile_number: req.body.mobile_number,
    website: req.body.website,
  };
  let sql = 'INSERT INTO gen_reg SET ?';
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

//View all borrower Profile

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM gen_reg';
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

//View borrower profile by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM gen_reg WHERE id=' + req.params.id;
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
  let sql = 'DELETE FROM gen_reg ';
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
  let sql = 'DELETE FROM gen_reg WHERE id=' + req.params.id;
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
