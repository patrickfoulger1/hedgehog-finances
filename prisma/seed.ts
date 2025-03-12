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
      id: "67cac6fc0d9b14f6f10643b8",
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
      contactPrefs: {
        create: [
          { stockSymbol: "AAPL", push: false, email: false, inApp: true },
          { stockSymbol: "NVDA", push: false, email: false, inApp: true },
        ],
      },
    },
  });
  const drew = await prisma.user.upsert({
    where: { email: "drew@werd.uk" },
    update: {},
    create: {
      id: "67cac6fc0d9b14f6f10643bb",
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
      contactPrefs: {
        create: [
          { stockSymbol: "ORCL", push: false, email: false, inApp: true },
          { stockSymbol: "META", push: false, email: false, inApp: true },
        ],
      },
    },
  });

  const andi = await prisma.user.upsert({
    where: { email: "andi1@gmail.com" },
    update: {},
    create: {
      id: "67caca3d2cc41a6be6731140",
      email: "web.aeriallistique@gmail.com",
      username: "Andi Taz",
      password,
      watchlist: {
        create: [
          {
            stockSymbol: "AAPL",
          },
          {
            stockSymbol: "AMZN",
          },
          {
            stockSymbol: "ORCL",
          },
          {
            stockSymbol: "META",
          },
        ],
      },
      contactPrefs: {
        create: [
          { stockSymbol: "ORCL", push: false, email: false, inApp: true },
          { stockSymbol: "META", push: false, email: false, inApp: true },
          { stockSymbol: "AAPL", push: false, email: false, inApp: true },
          { stockSymbol: "AMZN", push: false, email: false, inApp: true },
        ],
      },
    },
  });

  const john = await prisma.user.upsert({
    where: { email: "johnpflug@outlook.com" },
    update: {},
    create: {
      id: "67cbc6fc0d9b14f6f10648bb",
      email: "johnpflug@outlook.com",
      username: "John Pflug",
      password,
      watchlist: { create: [{ stockSymbol: "AAPL" }, { stockSymbol: "META" }] },
      contactPrefs: {
        create: [
          { stockSymbol: "META", push: false, email: false, inApp: true },
          { stockSymbol: "AAPL", push: false, email: false, inApp: true },
        ],
      },
    },
  });

  console.log(patrick, " added to db");
  console.log(drew, " added to db");
  console.log(andi, " added to db");
  console.log(john, " added to db");
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
