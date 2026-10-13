const userService = require("../services/userService");

const ROLES = ["CUSTOMER", "RESTAURANT_OWNER", "ADMIN"];

async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

async function updateUser(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const { firstName, lastName, email, phoneNumber, role, isActive } =
      req.body;

    if (role !== undefined && !ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (isActive === false && userId === req.userId) {
      return res
        .status(400)
        .json({ message: "You cannot deactivate your own account" });
    }

    const user = await userService.updateUser(userId, {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      isActive,
    });

    res.status(200).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already in use" });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
}

module.exports = {
  getUsers,
  updateUser,
};
