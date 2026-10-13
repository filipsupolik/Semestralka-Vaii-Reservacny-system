const { prisma } = require("../../lib/prisma");

const PUBLIC_USER_FIELDS = {
  userId: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  role: true,
  isActive: true,
};

async function getAllUsers() {
  return prisma.user.findMany({
    select: PUBLIC_USER_FIELDS,
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
}

async function updateUser(userId, { firstName, lastName, email, phoneNumber, role, isActive }) {
  const data = {};
  if (firstName !== undefined) data.firstName = firstName;
  if (lastName !== undefined) data.lastName = lastName;
  if (email !== undefined) data.email = email;
  if (phoneNumber !== undefined) data.phoneNumber = phoneNumber;
  if (role !== undefined) data.role = role;
  if (isActive !== undefined) data.isActive = isActive;

  return prisma.user.update({
    where: { userId },
    data,
    select: PUBLIC_USER_FIELDS,
  });
}

module.exports = {
  getAllUsers,
  updateUser,
};
