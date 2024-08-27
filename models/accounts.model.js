const prisma = require('../config/prisma');

const ACCOUNTS = {
    create: async (req) => {
        const { acc_numb, password, pin, balance, userId} = req.body;
        
        try {
            const result = await prisma.accounts.create({
                data: {
                    acc_numb,
                    password,
                    pin,
                    balance,
                    userId
                },
                select: {
                    id: true,
                    acc_numb: true,
                    password: true,
                    pin: true,
                    balance: true,
                    userId: true,
                    createdAt: true
                }
            })
            return result
        } catch (err) {
            console.log(err)
            return {
                status: false,
                message: err.message
            }
        }
    }
}

module.exports = ACCOUNTS;