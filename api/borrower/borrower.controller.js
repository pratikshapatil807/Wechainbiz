const {
  create,
  getBorrowerById,
  getBorrower,
  updateBorrower,
  deleteBorrower,
  getBorrowerByBorrowerEmail,
} = require('./borrower.service');
var nodemailer = require('nodemailer');
require('dotenv').config();
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pool = require('../../config/database');

module.exports = {
  createBorrower: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      const jsontoken = sign({ results }, 'qwe1234', {
        expiresIn: '1h',
      });
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'User Already registered..!!',
        });
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smitivtechnologies.123@gmail.com',
          pass: 'smitiv@123',
        },
      });
      var mailOptions = {
        from: 'smitivtechnologies.123@gmail.com',
        to: body.email,
        subject:
          'Please Verify Your Email address to complete Signup,Copy the secrete token to complete Your Profile',
        text:
          'Thank you for using Wechainbiz if you havent done already, Please confirm  that you want to use this address in your wechainbiz account, once ypu verify you can start use our platform. pleace click on below link to verify  http://ec2-54-251-142-179.ap-southeast-1.compute.amazonaws.com:3043/verifyemaiil&token=' +
          jsontoken,
      };
      var sql =
        "update register set token='" +
        jsontoken +
        "' where email='" +
        body.email +
        "'";
      pool.query(sql, (error, results, fields) => {});
      var sql =
        "update register set status='" +
        2 +
        "' where email='" +
        body.email +
        "'";
      pool.query(sql, (error, results, fields) => {});
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({
            status: 'Kindly Check Your Email for Activation',
          });
        }
      });

      return res.status(200).json({
        status: 200,
        message: 'register successfully',
        data: body,
        message: mailOptions,
      });
    });
  },
  getBorrowerById: (req, res) => {
    const id = req.params.id;
    getBorrowerById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          status: 500,
          message: 'Record not found',
        });
      }
      return res.json({
        status: 200,
        data: results,
      });
    });
  },
  getBorrower: (req, res) => {
    getBorrower((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          status: 500,
          message: 'Record not found',
        });
      }
      return res.json({
        status: 200,
        data: results,
      });
    });
  },

  updateBorrower: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateBorrower(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          status: 500,
          message: 'Update failed',
        });
      }
      return res.json({
        status: 200,
        message: 'updated successfully',
      });
    });
  },
  deleteBorrower: (req, res) => {
    const data = req.body;
    deleteBorrower(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          status: 500,
          message: 'Delete Failed',
        });
      }
      return res.json({
        status: 200,
        data: 'Deleted successfully',
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getBorrowerByBorrowerEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          status: 500,
          data: 'Invalid email or password',
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, 'qwe1234', {
          expiresIn: '24h',
        });
        return res.json({
          status: 200,
          message: 'login successfully',
          data: results,
        });
      } else {
        return res.json({
          status: 500,
          data: 'Invalid email or password',
        });
      }
    });
  },
};
