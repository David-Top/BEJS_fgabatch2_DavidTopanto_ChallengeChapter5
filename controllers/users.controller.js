const USER_MODELS = require('../models/users.model');
const prisma = require('../config/prisma');

async function index(req, res) {
    try {
        const users = await prisma.users.findMany({
            select: {
                nik: true,
                name: true,
                address: true,
                email: true,
                phone_number: true,
            }
        });
        res.json(users);
    } catch (err) {
        throw new Error(err);
    }
}

async function userById(req, res) {
    try {
        const userId = req.params.id;
        const isUser = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!isUser) {
            throw new Error('User not Found');
        }

        const userDetails = await prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                nik: true,
                name: true,
                address: true,
                email: true,
                phone_number: true,
            }
        })
        res.json(userDetails)
    } catch (err) {
        res.send(err.message);
    }
}

async function createUser(req, res) {
    try {
        const { nik, name, address, email, phone_number } = req.body;
        if (!nik || !name || !address || !email || !phone_number) {
            res.json({
                status: 'error',
                message: 'Data can not be Null'
            });
        }else{
            const newUser = await USER_MODELS.createNewUser(nik, name, address, email, phone_number);
            res.json(newUser);
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
    userById,
    createUser
};