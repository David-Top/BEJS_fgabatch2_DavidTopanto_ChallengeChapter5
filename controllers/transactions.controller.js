const prisma = require('../config/prisma');
const TRANSACTIONS_MODEL = require('../models/transactions.model')

async function index(req, res) {
    try {
        const transactions = await prisma.transactions.findMany({
            select: {
                transactionTypeId: true,
                accountFromId: true,
                accountToId: true,
                amount: true,
                date: true,
                note: true
            }
        });
        res.json(transactions);
    } catch (err) {
        throw new Error(err);
    }
}

async function getById(req, res) {
    try {
        const transactionsId = req.params.id;
        const isTransactions = await prisma.transactions.findUnique({
            where: {
                id: transactionsId
            }
        })
        
        if (!isTransactions) {
            throw new Error('Transaction not Found');
        }

        const transactionsDetails = await prisma.transactions.findUnique({
            where: {
                id: accId
            },
            select: {
                transactionTypeId: true,
                accountFromId: true,
                accountToId: true,
                amount: true,
                date: true,
                note: true
            }
        })
        res.json(transactionsDetails);
    } catch (err) {
        res.send(err.message)
    }
}

async function createTransaction(res, req) {
    try {
        const { transactionTypeId, accountFromId, accountToId, amount, note } = req.body;
        if (!transactionTypeId || !accountFromId || !accountToId || !amount || !note) {
            res.json({
                status: 'error',
                message: 'Data can not be Null'
            });
        }else{
            const newTransaction = await TRANSACTIONS_MODEL.createNewTransaction(transactionTypeId, accountFromId, accountToId, amount, date, note);
            res.json(newTransaction);
        }
    } catch (err) {
        res.json({
            status: 'error',
            message: 'Failed to create user'
        });
    }
}

module.exports = {
    index,
    getById,
    createTransaction
}