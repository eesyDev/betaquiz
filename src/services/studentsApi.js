import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method) => ({ 
    url, method
 });


export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery,
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => {
                const request = createRequest('/students/student', 'GET');
                return request;
            },
        }),
        getGroupsIds: builder.query({
            query: () => {
                const request = createRequest('/students/student', 'GET');
                return request;
            },
        }),
    })
});

export const { useGetStudentsQuery } = studentsApi;