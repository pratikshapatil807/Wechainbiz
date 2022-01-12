const pool = require('../../config/database');
const router = require('express').Router();
const upload = require('../../upload_middleware/upload');
const { checkToken } = require('../../auth/token_validation');

//Upload the file

router.post(
  '/',
  checkToken,
  upload.fields([
    {
      name: 'file_to_upload',
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log(req.files);
    let data = {
      //   company_name: req.body.company_name,
      file_to_upload:
        'http:' +
        '//' +
        req.hostname +
        ':' +
        8000 +
        '/' +
        req.files.file_to_upload[0].path,
    };
    let sql = 'INSERT INTO file_upload SET ?';
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
        message: 'success',
        data: data,
      });
    });
  }
);

module.exports = router;
