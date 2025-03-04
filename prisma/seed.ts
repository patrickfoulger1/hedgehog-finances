import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
async function main() {
  const password = await hash("password123" + secret, 12);
  const patrick = await prisma.user.upsert({
    where: { email: "patrickfoulger1@gmail.com" },
    update: {},
    create: {
      email: "patrickfoulger1@gmail.com",
      username: "Patrick Foulger",
      password,
      watchlist: {
        create: [
          {
            stockSymbol: "AAPL",
          },
          {
            stockSymbol: "NVDA",
          },
        ],
      },
    },
  });
  const drew = await prisma.user.upsert({
    where: { email: "drew@werd.uk" },
    update: {},
    create: {
      email: "drew@werd.uk",
      username: "Drew Dodd",
      password,
      watchlist: {
        create: [
          {
            stockSymbol: "ORCL",
          },
          {
            stockSymbol: "META",
          },
        ],
      },
    },
  });

  console.log(patrick, " added to db");
  console.log(drew, " added to db");
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
