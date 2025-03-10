import { rejects } from 'assert';
import finnhub from 'finnhub'
import { StockNewsData } from '@/lib/types';
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_KEY
const finnhubClient = new finnhub.DefaultApi()

export const getCompanyNews = async (symbol: string): Promise<StockNewsData[]> => {
    const date = new Date()
    const rawDay = date.getDay()
    const day = rawDay < 10 ? '0' + rawDay : rawDay
    const rawMonth = date.getMonth() + 1
    const month = rawMonth < 10 ? '0' + rawMonth : rawMonth
    const year = date.getFullYear()
    return new Promise((resolve, reject) => {
        finnhubClient.companyNews(symbol, `${year - 1}-${month}-${day}`, `${year}-${month}-${day}`, (error, data, response) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(data as StockNewsData[])
            }
        })
    })
}