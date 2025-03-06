import axios from "axios";
export const apiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY;
export const api = axios.create({
  baseURL: "https://api.twelvedata.com",
  timeout: 6000,
});

export default async function getStockData(symbol: string) {
  return api
    .get(
      `/time_series?symbol=${symbol}&interval=30min&outputsize=50&apikey=${apiKey}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
