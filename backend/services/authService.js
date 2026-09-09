const bcrypt = require("bcryptjs");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { firstName, lastName, email, password, phonenNumber, role } = req.body;

  //encrypt password
  const hashedPassword = bcrypt.hashSync(password, 6);

  try {
    const user = await prisma.user.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      phonenNumber: phonenNumber,
      role: role,
    });

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
}

module.exports = { registerUser };
