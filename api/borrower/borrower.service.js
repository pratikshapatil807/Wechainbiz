const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into register(first_name, last_name, email, password, mobile_no, uen_no, ifsc_code, number_of_employees, annual_tunover, broker_code)
            values(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.mobile_no,
        data.uen_no,
        data.ifsc_code,
        data.number_of_employees,
        data.annual_tunover,
        data.broker_code,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getBorrowerById: (id, callBack) => {
    pool.query(
      `select id,first_name, last_name, email, password, mobile_no, uen_no, ifsc_code, number_of_employees, annual_tunover, broker_code from register where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getBorrower: (callBack) => {
    pool.query(
      `select id,first_name, last_name, email, password, mobile_no, uen_no, ifsc_code, number_of_employees, annual_tunover, broker_code from register`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateBorrower: (data, callBack) => {
    pool.query(
      `update register set first_name=?, last_name=?, email=?, password=?, mobile_no=?, uen_no=?, ifsc_code=?, number_of_employees=?, annual_tunover=?, broker_code=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.mobile_no,
        data.uen_no,
        data.ifsc_code,
        data.number_of_employees,
        data.annual_tunover,
        data.broker_code,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteBorrower: (data, callBack) => {
    pool.query(
      `delete from register where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBorrowerByBorrowerEmail: (email, callBack) => {
    pool.query(
      `select * from register where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
