'use client'
import { StockNewsData } from "@/lib/types";
import StockNews from "./stockNews";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export default function NewsList({ news }: { news: StockNewsData[] }) {
    const paginationHandler = (button, setPage) => {
        button.trim('') === 'Previous' ? setPage((prevVal) => prevVal - 1) : setPage((prevVal) => prevVal + 1)
    }
    const limit = 10
    let [page, setPage] = useState(0)
    const [articles, setArticles] = useState([])
    useEffect(() => {
        if (page === 0) {
            setArticles(news.slice(page, limit));
            return
        }
        setArticles(news.slice(page * limit, page * limit + limit));
    }, [page]);
    return (
        <>
            <div className="news">
                {articles.map((post) => {
                    return <StockNews post={post} key={post.id} />
                })}
            </div>
            <div className="flex justify-center w-100% mt-10 mb-20">
                {page !== 0 ?
                    <a href='#newsStart'>
                        <Button className="m-3" onClick={(e) => paginationHandler(e.currentTarget.textContent, setPage)}>Previous</Button>
                    </a> : null}
                {articles.length === 10 ?
                    <a href='#newsStart'>
                        <Button className="m-3" onClick={(e) => paginationHandler(e.currentTarget.textContent, setPage)}>Next</Button>
                    </a> : null}
            </div>
        </>
    )
}