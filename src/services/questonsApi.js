import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

const createRequest = (url, method, data) => ({ 
    url, method, body: data
 });


export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.betterquiz.kz/api',
        prepareHeaders: (headers, { getState }) => {
          headers.set('Content-Type', 'application/json');
          const token = window.localStorage.getItem('token');
          if (token) {
                headers.set('Authorization', token)
            }
          return headers;
        },
      }),
    endpoints: (builder) => ({
        createQuestion: builder.mutation({
            query: (data) => {
                const request = createRequest('/q/questions/', 'POST', data);
                console.log('Request:', request);
                return request;
            },
        }),
        createQuiz: builder.mutation({
            query: (data) => {
                const request = createRequest('/v2/quiz/quiz', 'POST', data);
                return request;
            },
        }),
        getGroupNumberForLessonForQuiz: builder.query({
            query: () => {
                const request = createRequest('/subjects/class_number', 'GET');
                return request;
            },
        }),
        getSubjectLessonForQuiz: builder.query({
            query: () => {
                const request = createRequest('/subjects/subject', 'GET');
                return request;
            },
        }),
        getTagsForQuestion: builder.query({
            query: () => {
                const request = createRequest('/q/question-tags', 'GET');
                return request;
            },
        }),
        setTagsForQuestion: builder.mutation({
            query: (data) => {
                const request = createRequest('/q/question-tags/', 'POST', data);
                return request;
            },
        }),
        editQuestion: builder.mutation({
            query: (id, data) => {
                const request = createRequest(`/q/questions/${id}/`, 'PATCH', data);
                return request;
            },
        }),
        editTags: builder.mutation({
            query: (id, data) => {
                const request = createRequest(`/q/question-tags/${id}/`, 'PATCH', data);
                return request;
            },
        }),
        getAllExistingQuestions: builder.query({
            query: () => {
                const request = createRequest('/q/questions/', 'GET');
                return request;
            },
        }),
    })
});

export const { 
    useCreateQuestionMutation, 
    useCreateQuizMutation,
    useGetGroupNumberForLessonForQuizQuery,
    useGetSubjectLessonForQuizQuery,
    useSetTagsForQuestionMutation, 
    useGetTagsForQuestionQuery,
    useEditQuestionMutation,
    useGetAllExistingQuestionsQuery
 } = questionApi;