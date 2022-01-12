const { createPool } = require('mysql');

const pool = createPool({
  port: 3306,
  //host: 'localhost',
  //user: 'root',
  //password: '',
  // database: 'wechainbiz_db',
  database: 'wechainbiz_db_new',
  host: 'guardsappdev.clt6g6huqccp.ap-southeast-1.rds.amazonaws.com',
  user: 'guardsAppAdmin',
  password: 'govind123',
  connectionLimit: 10,
});

pool.getConnection(function (err) {
  if (err) {
    console.log('Database connection error..!!');
    return;
  }
  console.log('DB Connected Successfully..!!');
});

module.exports = pool;
