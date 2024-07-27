const prisma = require('../config/prisma');

async function createNewTransaction (transactionTypeId, accountFromId, accountToId, amount, note) {
    return await prisma.transactions.create({
        data: { 
            transactionTypeId, 
            accountFromId, 
            accountToId, 
            amount, 
            note
        }
    });
};

module.exports = {createNewTransaction};