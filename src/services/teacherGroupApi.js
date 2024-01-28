import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method) => ({ 
    url, method
 });


export const teacherGroupApi = createApi({
    reducerPath: 'teacherGroupApi',
    baseQuery,
    endpoints: (builder) => ({
        getTeacherGroups: builder.query({
            query: () => {
                const request = createRequest('/alfa_requests/groups/get_teacher_groups', 'POST');
                return request;
            },
        })
    })
});

export const { useGetTeacherGroupsQuery } = teacherGroupApi;