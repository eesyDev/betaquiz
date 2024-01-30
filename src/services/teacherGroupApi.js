import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
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
        }),
        getGroupStudents: builder.query({
            query: (id) => {
                const request = createRequest('/alfa_requests/cgi_alfa/get_alfa_cgi', 'POST', id);
                return request;
            },
        }),
        getGroupById: builder.query({
            query: (id) => {
                const request = createRequest('/alfa_requests/groups/get_group_ids', 'POST', id);
                return request;
            },
        }),
    })
});

export const { useGetTeacherGroupsQuery, useGetGroupByIdQuery, useGetGroupStudentsQuery } = teacherGroupApi;