import { prisma } from "@/lib/db";

export default async function getWatchlist() {
    const watchlist = await prisma.watchlist.findMany();
    return watchlist;
}
