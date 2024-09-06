const express = require('express');
const router = express.Router();
const USERS_ROUTER = require('./users');
const ACCOUNT_ROUTER = require('./accounts');
const TRANSACTIONS_ROUTER = require('./transactions')
const { login } = require('../../../controllers/auth.controller')

//Endpoint Homepage
router.get('/', (req, res) => {
    res.send('Welcome to A Bank');
})

router.post('/login', login)

router.use('/users', USERS_ROUTER);

router.use('/accounts', ACCOUNT_ROUTER);

router.use('/transactions', TRANSACTIONS_ROUTER);

module.exports = router;