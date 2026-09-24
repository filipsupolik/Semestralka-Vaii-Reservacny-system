const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");
const jwt = require("jsonwebtoken");

async function findUser(req) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function checkPassword(req, user) {
  const { password } = req.body;

  const passwordValid = await bcrypt.compare(password, user.password);

  return passwordValid;
}

function login(user) {
  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
  return {
    token,
    email: user.email,
    role: user.role,
  };
}

async function registerUser(req) {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 6);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    },
  });

  const token = jwt.sign(
    { id: user.userId, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );

  return { token };
}

module.exports = { registerUser, findUser, checkPassword, login };
