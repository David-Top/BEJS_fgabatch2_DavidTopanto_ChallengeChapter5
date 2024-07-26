const express = require('express');
const router = express.Router();

const ACCOUNTS_CONTROLLER = require('../../../../controllers/account.controller');

router.get('/', ACCOUNTS_CONTROLLER.index);

module.exports = router;