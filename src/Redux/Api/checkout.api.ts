import { apiSlice } from './apiSlice';


export const checkoutApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (planId: string) => ({
                url: '/subscription/createCheckoutSession',
                method: 'POST',
                body: { planId },
            }),
        }),

        getUserSubscriptionStatus:builder.query({
            query: () => ({
                url: `subscription//checkSubscriptionStatus`,
                method: 'GET',
            }),
        }),

        getSubscriptionHistory: builder.query<void, void>({
            query: () => ({
                url: '/subscription/getSubscriptionHistory',
                method: 'GET',
            }),
        })

    
    }),
})


export const { useCreateCheckoutSessionMutation ,useGetUserSubscriptionStatusQuery,useGetSubscriptionHistoryQuery} = checkoutApi