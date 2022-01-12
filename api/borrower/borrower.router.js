const {
  createBorrower,
  getBorrowerById,
  getBorrower,
  updateBorrower,
  deleteBorrower,
  login,
} = require('./borrower.controller');
var nodemailer = require('nodemailer');
const router = require('express').Router();
// const { checkToken } = require('../../auth/token_validation');

const {
  addBorrowerValidation,
} = require('../../validation/borrowers/borrower.validation');
const { checkToken } = require('../../auth/token_validation');

router.post('/', addBorrowerValidation, createBorrower);
router.get('/', getBorrower);
router.get('/:id', getBorrowerById);

router.post('/login', login);

module.exports = router;
