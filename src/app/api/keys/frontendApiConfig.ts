import axios from 'axios'
export const apiKey = process.env.NEXT_PUBLIC_FRONTEND_API_KEY;
export const api = axios.create({
    baseURL: 'https://api.twelvedata.com',
    timeout: 6000
})