const prisma = require('../config/prisma');

const TRANSACTIONS = {
    create: async (req) => {
        const { amount, note, accountFromId, accountToId, transactionTypeId } = req.body;

        if (!transactionTypeId || !accountFromId || !accountToId || !amount) {            
            throw new Error("Data can not be Null");
        }
            
        try {
            const result = await prisma.transactions.create({
                data: {
                    amount,
                    note,
                    accountFromId,
                    accountToId,
                    transactionTypeId
                },
                select: {
                    id: true,
                    amount: true,
                    note: true,
                    date: true,
                    accountFromId: true,
                    accountToId: true,
                    transactionTypeId: true
                }
            })

            return result;
        } catch (err) {
            console.log(err);
            return {
                status: false,
                message: err.message
            }
        }
    },

    createType: async (req) => {
        const { desc } = req.body;
        try {
            const result  = await prisma.transactionType.create({
                data: {                    
                    desc
                },
                select: {
                    id: true,
                    desc: true
                }
            })
            return result;
        } catch (err) {
            console.log(err);
            return {
                status: false,
                message: err.message
            }
        }
    },

    updateType: async (req) => {
        const transactionTypeId = parseInt(req.params.id);
        const { desc } = req.body;
        
        const isTransactionTypeId = await prisma.transactionType.findUnique({
            where:{
                id: transactionTypeId
            }
        });

        if (!isTransactionTypeId) {
            throw new Error("Transaction Type is Not Found");            
        }

        try {
            const result = await prisma.transactionType.update({
                where: {
                    id: transactionTypeId
                },
                data: {
                    desc
                }
            });

            return result;
        } catch (err) {
            console.log(err);
            return{
                status: false,
                message: err.message
            }
        }
    }
}

module.exports = TRANSACTIONS;