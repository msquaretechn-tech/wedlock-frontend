import { apiSlice } from './apiSlice';


export const checkoutApi = apiSlice.injectEndpoints({
  
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: ({ planId, paymentMethod }: { planId: string; paymentMethod?: string }) => ({
                url: '/subscription/createCheckoutSession',
                method: 'POST',
                body: { planId, paymentMethod },
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