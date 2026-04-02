import { apiSlice } from './apiSlice';


export const notificationApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        sendNotifcation: builder.mutation({
            query: (data) => ({
                url: '/notifications/sendNotification',
                method: 'POST',
                body: data 
            
            }),
        }),

        getNotification: builder.query<void, void>({
            query: () => ({
                url: '/notifications/getAllNotification',
                method: 'GET',
            }),
        }),

        removeNotification: builder.mutation({
            query: (notificationId) => ({
                url: '/notifications/deleteNotification',
                method: 'DELETE',
                body: {notificationId: notificationId}
            }),
        }),
       

    }),
});

export const { useSendNotifcationMutation, useGetNotificationQuery, useRemoveNotificationMutation } = notificationApi;


