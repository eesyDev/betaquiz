import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery,
    endpoints: (builder) => ({
        getTeachers: builder.query({
            query: () => {
                const request = createRequest('/teachers/teacher', 'GET');
                return request;
            },
        })
    })
});

export const { useGetTeachersQuery } = teacherApi;