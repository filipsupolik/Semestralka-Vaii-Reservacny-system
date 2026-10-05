const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Set ADMIN_PASSWORD environment variable before seeding");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", password: hashedPassword },
    create: {
      firstName: "Admin",
      lastName: "Admin",
      email,
      password: hashedPassword,
      phoneNumber: "000000000",
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
