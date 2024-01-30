import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery,
    endpoints: (builder) => ({
        getLessons: builder.query({
            query: () => {
                const request = createRequest('/alfa_requests/lessons/get_subjects', 'POST');
                return request;
            },
        }),
        getTeacherLessons: builder.query({
            query: (data) => {
                const request = createRequest('/alfa_requests/lessons/get_teacher_lessons', 'POST', data);
                return request;
            },
        }),
        getSubjects: builder.query({
            query: () => {
                const request = createRequest('/subjects/subject', 'GET');
                return request;
            },
        }),
        getSingleSubject: builder.query({
            query: (id) => {
                const request = createRequest(`/subjects/subject/${id}`, 'GET');
                return request;
            },
        }),
        getSubjectById: builder.query({
            query: (data) => {
                const request = createRequest('/alfa_requests/lessons/get_lesson_id', 'POST', data);
                return request;
            },
        }),
    })
});

export const { 
    useGetLessonsQuery, 
    useGetTeacherLessonsQuery, 
    useGetSubjectsQuery, 
    useGetSingleSubjectQuery,
    useGetSubjectByIdQuery
 } = lessonsApi;