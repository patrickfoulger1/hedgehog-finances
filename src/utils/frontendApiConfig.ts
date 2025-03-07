"use server";

import axios from "axios";

const apiKeys = [
  process.env.TWELVEDATA_KEY_ONE,
  process.env.TWELVEDATA_KEY_TWO,
  process.env.TWELVEDATA_KEY_THREE,
];

export const api = axios.create({
  baseURL: "https://api.twelvedata.com",
  timeout: 6000,
});

export async function getStockData(symbol: string, keyIndex: number) {
  const apiKey = apiKeys[keyIndex];
  try {
    const { data } = await api.get(
      `/time_series?symbol=${symbol}&interval=30min&outputsize=50&apikey=${apiKey}`
    );

    if (data.status === "error") {
      return Promise.reject({ error: data, symbol });
    } else {
      return data;
    }
  } catch (error) {
    return Promise.reject({ error: error, symbol });
  }
}
export async function getStocks(symbols: string[]) {
  function getRequests(symbols: string[], keyIndex: number) {
    return symbols.map((symbol) => {
      return getStockData(symbol, keyIndex);
    });
  }

  let successStocks = [];
  let failedStocks = [];

  for (let i = 0; i < apiKeys.length; i++) {
    const stocksToFetch = !failedStocks.length ? symbols : symbols;
    const stocksData = await Promise.allSettled(getRequests(stocksToFetch, i));

    failedStocks = stocksData.filter((stock) => stock.status === "rejected");
    const currentSuccessStocks = stocksData.filter(
      (stock) => stock.status === "fulfilled"
    );

    successStocks = [...successStocks, ...currentSuccessStocks];
    if (!failedStocks.length) {
      return successStocks.map(({ value }) => {
        return value;
      });
    }
  }

  return [
    ...successStocks.map(({ value }) => {
      return value;
    }),
    ...failedStocks,
  ];
}
