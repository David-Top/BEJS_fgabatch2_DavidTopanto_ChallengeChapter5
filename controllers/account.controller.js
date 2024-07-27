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
        res.json(accounts);
    } catch (err) {
        throw new Error(err);
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
        res.json(accDetails);
    } catch (err) {
        res.send(err.message)
    }
}

async function createAccount(res, req) {
    try {
        const { password, pin, balance, userId, acc_number } = req.body;
        if (!password || !pin || !balance || !userId || !acc_number) {
            res.json({
                status: 'error',
                message: 'Data can not be Null'
            });
        }else{
            const newAccount = await ACCOUNT_MODEL.createNewAccount(password, pin, balance, userId, acc_number);
            res.json(newAccount);
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
    createAccount
}