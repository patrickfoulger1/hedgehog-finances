"use server"
import axios from "axios";
const apikey = process.env.FINANCIAL_MODELING_API_KEY
const api = axios.create({
  baseURL: "https://financialmodelingprep.com/stable/",
  timeout: 6000,
})


export default async function getDividendInfo(stockSymbol: string) {
  return api
    .get(`dividends`, {
      params: {
        symbol: stockSymbol,
        limit: 1,
        apikey: apikey
      }
    })
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      console.log(err);
    })
}

