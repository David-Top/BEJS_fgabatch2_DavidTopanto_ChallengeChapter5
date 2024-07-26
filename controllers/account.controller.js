const prisma = require('../config/prisma');

async function index(req, res) {
    try {
        const accounts = await prisma.accounts.findMany({
            select: {
                balance: true
            }
        });
        res.json(accounts);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    index
}