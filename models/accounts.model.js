const prisma = require('../config/prisma');

async function createNewAccount (password, pin, balance, userId, acc_number) {
    return await prisma.users.create({
        data: { 
            password, 
            pin, 
            balance, 
            userId, 
            acc_number
        }
    });
};

module.exports = {createNewAccount};