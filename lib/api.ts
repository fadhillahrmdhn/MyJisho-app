import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_JISHO_API_BASE_URL,
    timeout: 10000,
})