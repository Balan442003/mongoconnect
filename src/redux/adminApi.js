import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({

        getAdminData: builder.query({
            query: () => 'admin',
            providesTags: ['Admin'],
        }),

        addAdminData: builder.mutation({
            query: ({ editorData }) => ({
                url: 'admin',
                method: 'POST',
                body: { editorData },
            }),
            invalidatesTags: ['Admin'],
        }),
        adminLogIn: builder.mutation({
            query: (data) => ({
                url: "admin/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Admin"],
        }),

    }),

});

export const { useGetAdminDataQuery, useAddAdminDataMutation, useAdminLogInMutation } = adminApi;