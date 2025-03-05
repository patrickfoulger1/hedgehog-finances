import levenshteinDistance from "@/utils/levenshteinDistance";
import Link from "next/link";
export default function SearchResults({ searchQuery, stockList }) {
  let filteredStocks = stockList
    .filter((stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((stock) => {
      return [stock, levenshteinDistance(searchQuery, stock.name)];
    });

  filteredStocks.sort((a, b) => a[1] - b[1]);

  filteredStocks = filteredStocks.slice(0, 10);
  console.log(filteredStocks);
  return filteredStocks.length > 0 ? (
    <div className="searchResults">
      {filteredStocks.map(([stock]) => {
        const formattedCompany = stock.name.toLowerCase();
        const formattedQuery = searchQuery.toLowerCase();
        const link = "/stocks/" + stock.symbol;
        if (formattedCompany.includes(formattedQuery)) {
          return (
            <Link href={link} className="stock" key={stock.symbol}>
              {stock.name}
            </Link>
          );
        }
      })}
    </div>
  ) : (
    <div className="searchResults">
      <div className="noData">No companies with such name</div>
    </div>
  );
}
