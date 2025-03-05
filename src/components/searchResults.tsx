import Link from "next/link"
export default function SearchResults({ searchQuery, stockList }) {
    const filteredStocks = stockList.filter(stock =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        filteredStocks.length > 0 ? (
            <div className="searchResults">
                {stockList.map((stock) => {
                    const formattedCompany = stock.name.toLowerCase()
                    const formattedQuery = searchQuery.toLowerCase()
                    const link = '/stocks/' + stock.symbol
                    if (formattedCompany.includes(formattedQuery)) {
                        return <Link href={link} className="stock" key={stock.symbol}>{stock.name}</Link>
                    }
                })}
            </div>
        ) : (
            <div className="searchResults">
                <div className="noData">No companies with such name</div>
            </div>
        )

    )
}