import axios from "axios";
export const apiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY;
export const reservedApiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY_RESERVED;
export const singleStockApiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY_STOCK;
export const api = axios.create({
  baseURL: "https://api.twelvedata.com",
  timeout: 6000,
});

export default async function getStockData(symbol: string) {
  return api
    .get(
      `/time_series?symbol=${symbol}&interval=30min&outputsize=50&apikey=${singleStockApiKey}`
    )
    .then(({ data }) => {
      if (data.code) {
        console.log("Reached first limit");
        return api
          .get(
            `/time_series?symbol=${symbol}&interval=30min&outputsize=50&apikey=${reservedApiKey}`
          )
          .then(({ data }) => {
            return data;
          });
      }
      return data;
    })
    .catch((error) => {});
}
