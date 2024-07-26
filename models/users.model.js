const prisma = require('../config/prisma');

async function createNewUser (nik, name, address, email, phone_number) {
    return await prisma.users.create({
        data: { 
            nik, 
            name, 
            address, 
            email, 
            phone_number 
        }
    });
};

module.exports = {createNewUser};