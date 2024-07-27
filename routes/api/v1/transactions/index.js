const express = require('express');
const router = express.Router();

const TRANSACTIONS_CONTROLLER = require('../../../../controllers/transactions.controller');

router.get('/', TRANSACTIONS_CONTROLLER.index);
router.get('/:id', TRANSACTIONS_CONTROLLER.getById);
// router.post('/create', TRANSACTIONS_CONTROLLER.createAccount);

module.exports = router;