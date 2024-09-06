const prisma = require('../config/prisma');
const bycrypt = require('bcrypt')

const ACCOUNTS = {
    create: async (req) => {
        const { email, acc_numb, password, pin, balance, userId} = req.body;
        
        try {
            const result = await prisma.accounts.create({
                data: {
                    email,
                    acc_numb,
                    password: bycrypt.hashSync(password, 10), //hashing user's password
                    pin,
                    balance,
                    userId
                },
                select: {
                    id: true,
                    email: true,
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