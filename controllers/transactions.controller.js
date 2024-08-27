const prisma = require('../config/prisma');
const TRANSACTIONS_MODEL = require('../models/transactions.model')

async function index(req, res) {
    try {
        const transactions = await prisma.transactions.findMany({
            select: {
                amount: true,
                date: true,
                note: true,
                accountFromId: true,
                accountToId: true,
                transactionTypeId: true                
            }
        });
        
        res.json({
            status: 200,
            message: "Success GET Transctions Data",
            data: transactions
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

async function getById(req, res) {
    const transactionId = req.params.id;
    const isTransaction = await prisma.transactions.findUnique({
        where: {
            id: transactionId
        }
    })
        
    if (!isTransaction) {
        throw new Error('Transaction not Found');
    }

    try {        
        const transactionsDetails = await prisma.transactions.findUnique({
            where: {
                id: transactionId
            },
            select: {
                amount: true,
                date: true,
                note: true,
                accountFromId: true,
                accountToId: true,
                transactionTypeId: true
            }
        })
        
        res.json({
            status: 200,
            message: "Success GET Transaction Data",
            data: transactionsDetails
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

async function createTransaction(req, res) {
    try {        
        const newTransaction = await TRANSACTIONS_MODEL.create(req);
        
        res.json({
            status: 201,
            message: "Success POST Transaction Data",
            data: newTransaction
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

async function createTransactionType(req, res) {
    try {
        const newTransactionType = await TRANSACTIONS_MODEL.createType(req);

        res.json({
            status: 200,
            message: "Success POST Transaction Type",
            data: newTransactionType
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

async function updateTransactionType(req, res) {
    try {
        const updateTt = await TRANSACTIONS_MODEL.updateType(req);

        res.json({
            status: 200,
            message: "Success PUT Transaction Type",
            data: updateTt
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

async function transactionsType(req, res) {
    try {
        const result =  await prisma.transactionType.findMany({
            select: {
                id: true,
                desc: true
            }
        });

        res.json({
            status: 200,
            message: "Success GET Transacations Type Data",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

module.exports = {
    index,
    getById,
    createTransaction,
    createTransactionType,
    updateTransactionType,
    transactionsType
}