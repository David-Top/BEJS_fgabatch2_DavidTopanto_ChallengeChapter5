const express = require('express');
const router = express.Router();

const ACCOUNTS_CONTROLLER = require('../../../../controllers/account.controller');

router.get('/', ACCOUNTS_CONTROLLER.index);
router.get('/:id', ACCOUNTS_CONTROLLER.getById);
router.post('/create', ACCOUNTS_CONTROLLER.createAccount);

module.exports = router;