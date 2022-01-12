const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const { validationResult } = require('express-validator');
const { checkToken } = require('../../auth/token_validation');

//Upload documents

router.post(
  '/',
  checkToken,
  upload.fields([
    {
      name: 'document_1',
      maxCount: 1,
    },
    {
      name: 'document_2',
      maxCount: 1,
    },
    {
      name: 'document_3',
      maxCount: 1,
    },
    {
      name: 'document_4',
      maxCount: 1,
    },
    {
      name: 'document_5',
      maxCount: 1,
    },
    {
      name: 'document_6',
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log(req.files);
    let data = {
      company_name: req.body.company_name,
      loan_id: req.body.loan_id,
      create_date: req.body.create_date, //loan application date
      product: req.body.product,
      expected_loan_amount: req.body.expected_loan_amount,
      preffered_terror: req.body.preffered_terror,
      status: req.body.status, //Application Status
      funders_selected: req.body.funders_selected,
      sme_contact_person: req.body.sme_contact_person,
      description: req.body.description, //documents_needed
      changed_status: req.body.changed_status, //change the status
      document_1:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_1[0].path,
      document_2:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_2[0].path,
      document_3:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_3[0].path,
      document_4:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_4[0].path,
      document_5:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_5[0].path,
      document_6:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.document_6[0].path,
    };

    let sql = 'INSERT INTO upload SET ?';
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

//View all uploaded documents

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM upload';
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

//View uploaded documents by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql =
    'SELECT * FROM loan_form join upload on loan_form.id = upload.id WHERE upload.loan_id="' +
    req.params.id +
    '" group by upload.id desc limit 0,1';
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

//View loan form with uploaded documents

router.get('/viewupload', checkToken, (req, res) => {
  let sql = 'SELECT * FROM loan_form join upload on loan_form.id = upload.id';
  let query = pool.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: 'some thing went wrong..!',
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
  let sql = 'DELETE FROM upload ';
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
  let sql = 'DELETE FROM upload WHERE id=' + req.params.id;
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
