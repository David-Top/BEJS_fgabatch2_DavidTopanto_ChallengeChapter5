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
        res.json({
            status: 200,
            message: "Success GET Users API",
            data: users
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
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
        res.json({
            status: 200,
            message: "Success GET User API",
            data: userDetails
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

async function createUser(req, res) {
    try {                
        const result = await USER_MODELS.create(req);
        res.json({
            status: 201,
            message: "Success POST Users API",
            data: result
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    index,
    userById,
    createUser
};