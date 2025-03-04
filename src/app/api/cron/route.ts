"use server";
import { Novu } from "@novu/api";
// import axios from 'axios';

// // TwelveData:
// const stockApi = axios.create({
//     baseURL: 'https://api.twelvedata.com/'
// });

// export async function GET(stockSymbol: string) {
//     const config = {
//         method: 'get',
//         url: '/quote',
//         params: {
//             symbol: stockSymbol,
//             apikey: process.env.NEXT_PUBLIC_APIKEY
//         }
//     };
//     stockApi(config)
//         .then(response => {
//             const stockData = response.data;
//             return stockData;
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

// GET('AAPL');

// Novu:
const novu = new Novu({
    secretKey: process.env.NEXT_PUBLIC_NOVU_KEY,
});

export async function sendMessage() {

    const result = await novu.trigger({
        workflowId: "subscription",
        payload: {
            message: "Hello",
        },
        to: {
            subscriberId: process.env.NEXT_PUBLIC_SUBSCRIBERID
        },
    });
}

sendMessage();