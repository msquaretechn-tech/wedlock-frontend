
import { apiSlice } from './apiSlice';


export const connectionApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createConnection: builder.mutation({
            query: (receiverId) => ({
                url: '/connection/addConnection',
                method: 'POST',
                body: { receiverId: receiverId }
            }),

        }),

        cancelConnection: builder.mutation({
            query: (receiverId) => ({
                url: '/connection/cancelConnection',
                method: 'POST',
                body: { receiverId: receiverId }
            }),

        }),
        removeConnection: builder.mutation({
            query: (receiverId) => ({
                url: '/connection/removeConnection',
                method: 'POST',
                body: { receiverId: receiverId }
            }),

        }),

        acceptConnection: builder.mutation({
            query: (senderId) => ({
                url: '/connection/acceptConnection',
                method: 'POST',
                body: { senderId: senderId }
            }),

        }),

        rejectConnection: builder.mutation({
            query: (senderId) => ({
                url: '/rejectConnection',
                method: 'POST',
                body: { senderId: senderId }
            }),

        }),

        getConnectionStatus: builder.mutation({
            query: (userId) => ({
                url: '/connection/getConnectionStatus',
                method: 'POST',
                body: { userId: userId }
            }),
        }),

        getMyConnections: builder.query({
            query: () => ({
                url: '/connection/getMyConnections',
                method: 'GET',
            }),
            // providesTags: ['MyConnections'],
        }),


        getSentConnectionRequests: builder.query({
            query: () => ({
                url: '/connection/getSentConnectionRequests',
                method: 'GET',
            }),
        }),





    }),
})

export const {
    useCreateConnectionMutation,
    useCancelConnectionMutation,
    useAcceptConnectionMutation,
    useRejectConnectionMutation,
    useRemoveConnectionMutation,
    useGetConnectionStatusMutation,
    useGetMyConnectionsQuery,
    useGetSentConnectionRequestsQuery
} = connectionApi;