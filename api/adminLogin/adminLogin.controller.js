const { getAdminByAdminEmail } = require('./adminLogin.service');
var nodemailer = require('nodemailer');
const { sign } = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getAdminByAdminEmail(body.email, (err, results) => {
      const jsontoken = sign({ results }, 'qwe1234', {
        expiresIn: '1h',
      });
      if (err) {
        console.log(err);
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
        to: 'jayaprakash@smitiv.co',
        subject:
          'Please Verify Your Email address to complete Signup,Copy the secrete token to complete Your Profile',
        text:
          'Thank you for using Wechainbiz if you havent done already, Please confirm the that you want to use this address in your wechainbiz account, once ypu verify you can start use our platform ',
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send({
            status: 'Kindly Check Your Email for Activation',
          });
        }
      });
      if (!results) {
        return res.json({
          status: 500,
          data: 'Invalid email or password',
        });
      } else {
        return res.json({
          status: 200,
          message: 'login successfully',
          data: results,
          message: mailOptions,
          token: jsontoken,
        });
      }
    });
  },
};
