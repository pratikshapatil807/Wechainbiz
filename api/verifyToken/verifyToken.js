const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');

router.post('/', (req, res) => {
  let token = req.body.token;
  var sql =
    "update register set status='" + 2 + "' where token='" + token + "'";
  pool.query(sql, (error, results, fields) => {});
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

module.exports = router;
