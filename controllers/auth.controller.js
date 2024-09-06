const prisma = require("../config/prisma");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    //Take email and password that user input from req.body
    const { email, password } = req.body;
    
    try {
        //select user by email
        const user = await prisma.accounts.findUnique({
            where: {
                email: email
            },            
        })        
    
        if (!user) {
            throw new Error("Email is Not Found");        
        }
                
        const isPassword = bycrypt.compareSync(password, user.password);    //compare inputed password and password in database (already been hashed)
        
        if (!isPassword) {
            throw new Error('Email or Password is Wrong')
        }

        //after successfully login GET token JWT
        const payloadToken = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(payloadToken, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.status(200).json({
            message: "Login Successully",
            data: token
        });
    } catch (err) {
        res.status(401).json({
            message: err.message
        })
        console.log(err)
    }
}

module.exports = {
    login
}