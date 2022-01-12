const express = require('express');
const app = express();
const cors = require('cors');

const borrowerRouter = require('./api/borrower/borrower.router');
const adminLoginRouter = require('./api/adminLogin/adminLogin.router');

app.use(cors());
app.use(express.json());

app.use('/api/borrower', borrowerRouter);
app.use('/api/adminLogin', adminLoginRouter);

app.use('/api/uploadDocument', require('./api/uploadDocuments/uploadDocument'));
// app.use('/api/borrower', require('./api/borrower/borrower'));
app.use('/api/assignLender', require('./api/assignLender/assignLender'));
app.use('/api/activeLoan', require('./api/activeLoan/activeLoan'));
app.use('/api/feedback', require('./api/feedback/feedback'));
app.use('/api/profile', require('./api/borrowerProfile/profile'));
app.use('/api/lenderSelect', require('./api/lenderSelect/lenderSelect'));
app.use('/api/funder', require('./api/funder/funder'));
app.use('/api/lenderView', require('./api/lenderView/lenderView'));
app.use('/api/loanStatus', require('./api/loanStatus/loanStatus'));
app.use('/api/verifyToken', require('./api/verifyToken/verifyToken'));
app.use('/api/directors', require('./api/directors/directors'));
app.use('/api/upload', require('./api/upload/upload'));
app.use(
  '/api/approve_onboard',
  require('./api/approve_onboard/approve_onboard')
);
app.use(
  '/api/lenderAcceptance',
  require('./api/lenderViewloanandAcceptance/lenderAcceptance')
);
app.use(
  '/api/productInformation',
  require('./api/productInformation/productInformation')
);
app.use(
  '/api/lenderProfile',
  require('./api/createLenderProfile/lenderProfile')
);
app.use('/api/enquiry', require('./api/enquiry/enquiry'));
app.use(
  '/api/loanApplication',
  require('./api/loanApplication/loanApplication')
);
app.use('/api/adminReport', require('./api/adminReport/adminReport'));
app.use('/api/repayment', require('./api/repayment/repayment'));

app.listen(8000, () => {
  console.log('server started on port 8000');
});
