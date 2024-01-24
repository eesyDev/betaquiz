import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const postApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.BASE_URL}),
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => createRequest('/students/student')
        }),
    })
});

export const { useGetStudentsQuery } = postApi;