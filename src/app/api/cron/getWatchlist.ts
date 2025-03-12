import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getWatchlist() {
    const watchlist = await prisma.watchlist.findMany();

    return watchlist;
}
