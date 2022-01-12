const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
var multer = require('multer');
// const { checkToken } = require('../../auth/token_validation');

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

//@route POST api/preschool
//@desc  Add  school Data
//access  Public

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
      logo: 'http:' + '//' + req.hostname + ':' + 3000 + '/' + req.file.path,
    };
    let sql = 'INSERT INTO funder_reg SET ?';
    let query = pool.query(sql, data, (err, results) => {
      if (err) throw err;
      return res.json({
        status: 1,
        message: 'success',
        data: data,
      });
    });
  }
);

//@route GET api/school
//@desc  Get all school
//access  Public

router.get(
  '/',
  // checkToken,
  (req, res) => {
    let sql = 'SELECT * FROM funder_reg';
    let query = pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'database connection error',
        });
      }
      return res.status(200).json({
        status: 200,
        message: ' success',
        data: results,
      });
    });
  }
);

//@route GET api/school/vender/vender_id
//@desc  Get school by Vender Id
//access  Public

router.get(
  '/view/:id',
  // checkToken,
  (req, res) => {
    let sql = 'SELECT * FROM funder_reg WHERE id=' + req.params.id;
    let query = pool.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'database connection error',
        });
      }
      return res.status(200).json({
        status: 200,
        message: ' success',
        data: results,
      });
    });
  }
);

module.exports = router;
