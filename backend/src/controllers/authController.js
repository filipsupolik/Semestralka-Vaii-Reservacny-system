const authService = require("../services/authService");

async function login(req, res) {
  try {
    const user = await authService.findUser(req);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const password = await authService.checkPassword(req, user);
    if (!password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const loggedUser = authService.login(user);
    res.json({ loggedUser, message: "Login successful" });
  } catch (error) {
    console.error(error.message);
    res.status(503).json({ message: "Service unavailable" });
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

async function getProfile(req, res) {
  try {
    const user = await authService.getUserById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
}

module.exports = { login, register, getProfile };
