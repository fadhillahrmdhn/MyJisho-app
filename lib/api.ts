import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_JISHO_API_BASE_URL,
    timeout: 10000,
    headers:{
        'User-Agent': 'MyJishoApp/1.0',
    }
})

export const tatoebaApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_TATOEBA_API_BASE_URL,
    timeout: 10000,
    headers:{
        'User-Agent': 'MyJishoApp/1.0',
    }

})