const pool = require('../../config/database');

module.exports = {
  getAdminByAdminEmail: (email, callBack) => {
    pool.query(
      `select * from admin_login where email = ?`,
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
