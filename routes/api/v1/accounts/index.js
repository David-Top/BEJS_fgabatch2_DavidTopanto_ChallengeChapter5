const express = require('express');
const router = express.Router();

const ACCOUNTS_CONTROLLER = require('../../../../controllers/account.controller');
const AUTH_MIDDLEWARE = require('../../../../middleware/auth.middleware');

router.get('/',AUTH_MIDDLEWARE, ACCOUNTS_CONTROLLER.index);
router.get('/:id',AUTH_MIDDLEWARE, ACCOUNTS_CONTROLLER.getById);
router.post('/create', ACCOUNTS_CONTROLLER.createAccount);

module.exports = router;