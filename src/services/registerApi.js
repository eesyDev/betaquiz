import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.betterquiz.kz/api',
        prepareHeaders: (headers, { getState }) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    endpoints: (builder) => ({
        verifyPhone: builder.mutation({
            query: (phone) => {
                const request = createRequest('/verify/verify_phone/', 'POST', phone);
                console.log('Request:', request);
                return request;
            },  
        }),
        verifyCode: builder.mutation({
            query: (code) => {
                const request = createRequest('/verify/verify_phone_number/', 'POST', code);
                console.log('Request:', request);
                return request;
            },  
        }),
        createTeacher:  builder.mutation({
            query: (user) => {
                const request = createRequest('/teachers/teacher/', 'POST', user);
                console.log('Request:', request);
                return request;
            },  
        }),
    })
});

export const { useVerifyPhoneMutation, useVerifyCodeMutation, useCreateTeacherMutation } = registerApi;