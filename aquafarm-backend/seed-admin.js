const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const password = "adminpassword";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin account already exists for ${email}`);
    return;
  }

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Admin account created successfully!`);
  console.log(`Username: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
