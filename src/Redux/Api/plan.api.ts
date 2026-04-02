
import { apiSlice } from './apiSlice';


export const planApi = apiSlice.injectEndpoints({
   
    endpoints: (builder) => ({
        getPlans: builder.query<void, void> ({
            query: () => 'plan/getAllPlans',
        }),
    }),
})

export const { useGetPlansQuery } = planApi

