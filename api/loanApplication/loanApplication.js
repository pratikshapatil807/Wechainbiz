const pool = require('../../config/database');
const router = require('express').Router();
var path = require('path');
const { checkToken } = require('../../auth/token_validation');

//Add Loan status updated to loan application

router.post('/loanstatusupdated', checkToken, (req, res) => {
  let data = {
    reasign_to_subadmin: req.body.reasign_to_subadmin,
    sub_admin: req.body.sub_admin,
    uen_number: req.body.uen_number,
    company_name: req.body.company_name,
    number_of_employees: req.body.number_of_employees,
    business_type: req.body.business_type,
    product: req.body.product,
    preffered_terror: req.body.preffered_terror,
    expected_loan_amount: req.body.expected_loan_amount,
    collaterals: req.body.collaterals,
    industry_type: req.body.industry_type,
    avg_monthly_balance: req.body.avg_monthly_balance,
    business_characteristics: req.body.business_characteristics,
    directors_anual_income: req.body.directors_anual_income,
    year: req.body.year,
    revenue: req.body.revenue,
    profit: req.body.profit,
    customer_type: req.body.customer_type,
    incorporation_date: req.body.incorporation_date,
    lenders: req.body.lenders,
    status: req.body.status,
    reason: req.body.subject,
    description: req.body.reason,
  };
  let msg = 'Admin ' + req.body.status + ' Loan Form';
  let sql_lf =
    "UPDATE loan_form set status='" +
    req.body.status +
    "',subject='" +
    req.body.subject +
    "',reason='" +
    req.body.reason +
    "' WHERE id='" +
    req.body.uen_number +
    "'";
  let sqllog =
    "insert into notificationlog(loan_id,description)values('" +
    req.body.uen_number +
    "','" +
    msg +
    "')";
  let querylog = pool.query(sqllog, (err, results) => {});
  query1 = pool.query(sql_lf);
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

//Add loan application

router.post('/', checkToken, (req, res) => {
  let data = {
    uen_number: req.body.uen_number,
    company_name: req.body.company_name,
    email_id: req.body.email_id,
    number_of_employees: req.body.number_of_employees,
    business_type: req.body.business_type,
    product: req.body.product,
    preffered_terror: req.body.preffered_terror,
    expected_loan_amount: req.body.expected_loan_amount,
    collaterals: req.body.collaterals,
    industry_type: req.body.industry_type,
    avg_monthly_balance: req.body.avg_monthly_balance,
    business_characteristics: req.body.business_characteristics,
    directors_anual_income: req.body.directors_anual_income,
    year: req.body.year,
    revenue: req.body.revenue,
    profit: req.body.profit,
    financier: req.body.financier,
    faculty_type: req.body.faculty_type,
    amount_limit: req.body.amount_limit,
    outstanding_amount: req.body.outstanding_amount,
    monthly_installment: req.body.monthly_installment,
    terror: req.body.terror,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    security: req.body.security,
    latest_security_value: req.body.latest_security_value,
    customer_type: req.body.customer_type,
    incorporation_date: req.body.incorporation_date,
    lender_wishlist: req.body.lender_wishlist,
    how_you_heard_this: req.body.how_you_heard_this,
    status: req.body.status,
  };
  let sql = 'INSERT INTO loan_form SET ?';
  let query = pool.query(sql, data, (err, results) => {
    let sqllog =
      "insert into notificationlog(loan_id,description,user)values('" +
      results.insertId +
      "','New Loan Form Added','Borrower')";
    console.log(sqllog);
    let querylog = pool.query(sqllog, (err, results) => {});
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
});

//View all loan applications

router.get('/', checkToken, getAllProducts);
//Pagination
function getAllProducts(req, res) {
  // limit as 5
  const limit = 2;
  // page number
  const page = req.query.page;
  // calculate offset
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
  const sql = 'select * from loan_form limit ' + limit + ' OFFSET ' + offset;
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'some thing went wrong..!!',
        });
      }
      // create payload
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        Data: results,
      };
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = 'Products for page ' + page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    });
  });
}

//View loan application by id

router.get('/view/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM loan_form WHERE id=' + req.params.id;

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

//View the notification logs

router.get('/logs/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM notificationlog WHERE loan_id=' + req.params.id;

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

//View loan application by Email

router.post('/Email', checkToken, (req, res) => {
  let email_id = req.body.email_id;
  let sql =
    'SELECT id,	create_date,	product,lender_wishlist,amount_limit,preffered_terror,create_date as cdate, status,subject,reason FROM loan_form WHERE email_id=?';
  let query = pool.query(sql, [email_id], (err, results) => {
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

//View loan list

router.get('/loan', checkToken, getAllProducts);
//Pagination
function getAllProducts(req, res) {
  // limit as 5
  const limit = 2;
  // page number
  const page = req.query.page;
  // calculate offset
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
  const sql =
    'select  id,uen_number,company_name,create_date,product,lender_wishlist,expected_loan_amount,terror,create_date as cdate,status from loan_form limit ' +
    limit +
    ' OFFSET ' +
    offset;
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'some thing went wrong..!!',
        });
      }
      // create payload
      var jsonResult = {
        page_count: results.length,
        page_number: page,
        Data: results,
      };
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = 'Products for page ' + page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    });
  });
}

//View loan list lender id
router.get('/lenderloan/:id', checkToken, (req, res) => {
  let sql =
    "SELECT loan_form.id,loan_form.uen_number,loan_form.company_name,loan_form.create_date,loan_form.product,loan_form.lender_wishlist,loan_form.expected_loan_amount,loan_form.terror,loan_form.create_date as cdate,loan_form.status FROM loan_form,assign_lender where loan_form.id=assign_lender.uen_number and assign_lender.lenders='" +
    req.params.id +
    "'";
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

//Select the product type

router.get('/selectLoanType', checkToken, (req, res) => {
  let sql = 'SELECT * FROM financing_product';
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

// Select product type by id

router.get('/selectLoanType/:id', checkToken, (req, res) => {
  let sql = 'SELECT * FROM financing_product WHERE id=' + req.params.id;
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

//Delete all data from the table

router.delete('/deleteall', checkToken, (req, res) => {
  let sql = 'DELETE FROM loan_form ';
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
  let sql = 'DELETE FROM loan_form WHERE id=' + req.params.id;
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
