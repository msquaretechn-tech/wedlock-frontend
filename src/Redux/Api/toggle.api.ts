import { apiSlice } from "./apiSlice";


export const toggleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        toggle: builder.mutation({
            query: (data) => ({
                url: '/toggle/toggle',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useToggleMutation } = toggleApi
