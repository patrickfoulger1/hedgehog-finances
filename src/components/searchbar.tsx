import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { api, getStockList } from "@/utils/frontendApiConfig";
import SearchResults from "./searchResults";
export default function SearchBar() {
    const [stockList, setStockList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        getStockList().then(({ data: data }) => {
            setStockList(data);
        });
    }, []);

    return (
        <div className="searchBarArea">
            <Input
                id="searchStocks"
                className="bg-white/10 inset-shadow-xs inset-shadow-white/10"
                value={searchQuery}
                placeholder="Search stocks by company name"
                onChange={async (e) => {
                    if (!stockList.length) {
                        setShowResults(true);
                    }
                    setShowResults(true);
                    setSearchQuery(e.currentTarget.value);
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setSearchQuery("");
                        setShowResults(false);
                    }, 300);
                }}
            />
            {showResults ? <SearchResults searchQuery={searchQuery} stockList={stockList} /> : null}
        </div>
    );
}
