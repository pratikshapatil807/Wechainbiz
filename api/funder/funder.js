const pool = require('../../config/database');
const router = require('express').Router();
var nodemailer = require('nodemailer');
const upload = require('../../upload_middleware/upload');
const { sign } = require('jsonwebtoken');
const { checkToken } = require('../../auth/token_validation');

//Add Funder /Lender

router.post(
  '/',
  upload.single('logo'),

  (req, res) => {
    let data = {
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      funding_domain: req.body.funding_domain,
      min_rate_of_interest: req.body.min_rate_of_interest,
      min_funding_amount: req.body.min_funding_amount,
      max_funding_Amount: req.body.max_funding_Amount,
      max_terron: req.body.max_terron,
      special_funder: req.body.special_funder,
      //logo: 'http:' + '//' + req.hostname + ':' + 8000 + '/' + req.file.path,
    };
    let sql = 'INSERT INTO funder_reg SET ?';
    let query = pool.query(sql, data, (err, results) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smitivtechnologies.123@gmail.com',
          pass: 'smitiv@123',
        },
      });

      function makeid(length) {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      console.log(makeid(5));
      var genpwd = makeid(5);
      var mailOptions = {
        from: 'smitivtechnologies.123@gmail.com',
        to: data.email,
        subject: 'You User name and password',
        text:
          'Thank you for using Wechainbiz.Your &User name is=' +
          data.email +
          '&password=' +
          genpwd,
      };
      var sql =
        "update funder_reg set password='" +
        genpwd +
        "' where email='" +
        data.email +
        "'";
      pool.query(sql, (error, results, fields) => {});
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            status: 500,
            message: 'some thing went wrong..!!',
          });
        } else {
          res.send({
            status: 'Kindly Check Your Email for Activation',
          });
        }
      });
      if (err) throw err;
      return res.status(200).json({
        status: 200,
        message: 'success..!!',
        data: data,
      });
    });
  }
);

//View all funders

router.get('/', checkToken, (req, res) => {
  let sql = 'SELECT * FROM funder_reg';
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

//View funder by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM funder_reg WHERE id=' + req.params.id;
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

//Funder Login

router.post(
  '/login',
  //  checkToken,
  (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = 'SELECT id,email FROM funder_reg WHERE email=? AND  password=?';
    let query = pool.query(sql, [email, password], (err, results) => {
      const jsontoken = sign({ results }, 'qwe1234', {
        expiresIn: '1h',
      });
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'some thing went wrong..!!',
        });
      }
      console.log(results.length <= 0);
      if (results.length <= 0) {
        return res.json({
          status: 500,
          data: 'Invalid email or password',
        });
      } else {
        return res.json({
          status: 200,
          message: 'login successfully',
          data: results,
          token: jsontoken,
        });
      }
    });
  }
);

//Delete all data from the table

router.delete('/deleteall', checkToken, (req, res) => {
  let sql = 'DELETE FROM funder_reg ';
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
  let sql = 'DELETE FROM funder_reg WHERE id=' + req.params.id;
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
