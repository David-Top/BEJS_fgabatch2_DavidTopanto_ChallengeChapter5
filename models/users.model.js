const prisma = require('../config/prisma');

const USERS = {
    create: async (req) => {
        const { nik, name, address, email, phone_number } = req.body;
        try {            
            if (!nik || !name || !address || !email || !phone_number) {
                throw new Error("Data can not be Null");                
            }
            
            const user = await prisma.users.create({
                data: {
                    nik,
                    name,
                    address,
                    email,
                    phone_number
                },
                select: {
                    id: true,
                    nik: true,
                    name: true,
                    address: true,
                    email: true,
                    phone_number: true,
                    createdAt: true
                }
            });

            return user;
        } catch (err) {
            console.log(err);
            return{
                status: false,
                message: err.message
            };
        }
    }
}

module.exports = USERS;