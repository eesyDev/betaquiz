import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => {
                const request = createRequest('/auth/token_login', 'POST', user);
                return request;
            },
        }),
        getProfile: builder.mutation({
            query: (user) => {
                const request = createRequest('/auth/token_login', 'POST', user);
                return request;
            },   
        }),
    })
});

export const { useLoginMutation, useGetProfileMutation } = authApi;