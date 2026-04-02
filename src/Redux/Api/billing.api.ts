
import { apiSlice } from './apiSlice';

export const billingApi = apiSlice.injectEndpoints({   
    
    endpoints: (builder) => ({
        getBillingInfo: builder.query<void, void>({
            query: () => ({
                url: '/billing/getBillingInfo',
                method: 'GET',
            }),
        })
    })


})


export const { useGetBillingInfoQuery } = billingApi