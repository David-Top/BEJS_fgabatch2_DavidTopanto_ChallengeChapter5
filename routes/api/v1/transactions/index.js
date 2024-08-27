const express = require('express');
const router = express.Router();

const TRANSACTIONS_CONTROLLER = require('../../../../controllers/transactions.controller');

router.get('/', TRANSACTIONS_CONTROLLER.index);
router.get('/:id', TRANSACTIONS_CONTROLLER.getById);
router.post('/create', TRANSACTIONS_CONTROLLER.createTransaction);

router.post('/type/create', TRANSACTIONS_CONTROLLER.createTransactionType);
router.put('/type/update/:id', TRANSACTIONS_CONTROLLER.updateTransactionType);
router.get('/type', TRANSACTIONS_CONTROLLER.transactionsType);

module.exports = router;