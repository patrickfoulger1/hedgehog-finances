import { Input } from "./ui/input"
import { useState } from "react"
import { api } from "@/app/api/keys/frontendApiConfig"
import SearchResults from "./searchResults"
export default function SearchBar() {
    const [stockList, setStockList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showResults, setShowResults] = useState(false)
    return (
        <div className="searchBarArea">
            <Input id="searchStocks" value={searchQuery} placeholder="Search stocks by company name"
                onChange={(e) => {
                    if (!stockList.length) {
                        api.get('/stocks?country=USA')
                            .then(({ data: { data } }) => {
                                setStockList(data)
                                setShowResults(true)
                            })
                    }
                    setShowResults(true)
                    setSearchQuery(e.currentTarget.value)
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setSearchQuery('')
                        setShowResults(false)
                    }, 300)
                }} />
            {showResults ? <SearchResults searchQuery={searchQuery} stockList={stockList} /> : null}
        </div>
    )
}