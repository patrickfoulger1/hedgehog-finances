import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const password = await hash("password123", 12);
  const patrick = await prisma.user.upsert({
    where: { email: "patrickfoulger1@gmail.com" },
    update: {},
    create: {
      email: "patrickfoulger1@gmail.com",
      username: "patrickfoulger1",
      password,
      watchlist: {
        create: [
          {
            stockSymbol: "APPL",
          },
          {
            stockSymbol: "NVDA",
          },
        ],
      },
    },
  });

  console.log(patrick, " added to db");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//test
