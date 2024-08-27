const prisma = require('../config/prisma');
const ACCOUNT_MODEL = require('../models/accounts.model')

async function index(req, res) {
    try {
        const accounts = await prisma.accounts.findMany({
            select: {
                acc_numb: true,
                balance: true
            }
        });
        res.json({
            status: 200,
            message: "Success GET Accounts API",
            data: accounts
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

async function getById(req, res) {
    try {
        const accId = req.params.id;
        const isAcc = await prisma.accounts.findUnique({
            where: {
                id: accId
            }
        })
        
        if (!isAcc) {
            throw new Error('Account not Found');
        }

        const accDetails = await prisma.accounts.findUnique({
            where: {
                id: accId
            },
            select: {
                acc_numb: true,
                balance: true
            }
        })
        res.json({
            status: 200,
            message: "Success GET Account API",
            data: accDetails
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

async function createAccount(req, res) {
    try {
        const newAccount = await ACCOUNT_MODEL.create(req);

        res.json({
            status: 201,
            message: "Success POST Account API",
            data: newAccount
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
        console.log(err);
    }
}

module.exports = {
    index,
    getById,
    createAccount
}