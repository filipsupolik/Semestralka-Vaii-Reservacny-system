const authService = require("../services/authService");

async function login(req, res) {
  try {
    const user = await authService.findUser(req);

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    const password = await authService.checkPassword(req, user);
    if (!password) {
      res.status(401).send({ message: "Invalid password" });
    }

    const loggedUser = authService.login(user);
    res.json({ loggedUser, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(503);
  }
}

async function register(req, res) {
  try {
    await authService.registerUser(req);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Registration failed" });
  }
}

module.exports = { login, register };
