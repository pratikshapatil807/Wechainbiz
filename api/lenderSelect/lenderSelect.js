const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');

const { checkToken } = require('../../auth/token_validation');

//Add lender selection

router.post('/', checkToken, upload.single('aip_letter'), (req, res) => {
  let data = {
    company: req.body.company,
    loan_id: req.body.loan_id,
    loan_application_date: req.body.loan_application_date,
    product: req.body.product,
    expected_loan_amount: req.body.expected_loan_amount,
    preffered_terror: req.body.preffered_terror,
    application_status: req.body.application_status,
    funders_selected: req.body.funders_selected,
    sme_contact_person: req.body.sme_contact_person,
    lender: req.body.lender,
    aip_letter:
      'http:' + '//' + req.hostname + ':' + 3000 + '/' + req.file.path,
  };
  let sql = 'INSERT INTO admin_gen_reg SET ?';
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

//View all lenders selected

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM admin_gen_reg';
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

//View lender selected by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM admin_gen_reg WHERE id=' + req.params.id;
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
  let sql = 'DELETE FROM admin_gen_reg ';
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
  let sql = 'DELETE FROM admin_gen_reg WHERE id=' + req.params.id;
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
