const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/prismaClient/prismaClient');

const registerUser = async (userData) => {
    const {firstName, lastName, email, password, phoneNumber, role} = userData;
    const hashPassword = await bcrypt.hash(password, 15);
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashPassword,
            phoneNumber,
            role
        }
    })

    return {
        email: user.email,
        role: user.role
    }
};

const loginUser = async (email, password) => {
    const existedUser = await prisma.user.findUnique({where: {email}});
    if (!existedUser) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_secret, {expiresIn: '1h'});

    return {
        token,
        email: user.email
    }
};