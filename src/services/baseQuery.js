import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://api.betterquiz.kz/api',
    prepareHeaders: (headers) => {
        const token = window.localStorage.getItem('token');
        console.log(token)
        if (token) {
            headers.set('Authorization', token)
        }
        return headers
    }
});

export default baseQuery;