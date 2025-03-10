import { Watchlist } from "@/lib/types";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return formattedDate.replace(",", "");
};

export const isStockInWatchlist = (
  watchlist: Array<Watchlist>,
  stockSymbol: String
) => {
  const isStockPresent = watchlist.filter(
    (stock) => stock.stockSymbol === stockSymbol
  );
  return isStockPresent;
};
