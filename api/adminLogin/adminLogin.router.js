const { login } = require('./adminLogin.controller');
const router = require('express').Router();

router.post('/login', login);

module.exports = router;
