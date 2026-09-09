const authService = require("../services/authService");

async function login(req, res) {}

async function register(req, res) {
  const user = await authService.registerUser(req);
  res.sendStatus(200).json(user);
}

module.exports = { login, register };
