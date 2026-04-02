import { apiSlice } from './apiSlice';

export const profileViewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfileViews: builder.query({
            query: () => ({
                url: '/profile-view/my-views',
                method: 'GET',
            }),
        }),
        addProfileView: builder.mutation({
            query: (receiverId) => ({
                url: '/profile-view/add-view',
                method: 'POST',
                body: { receiverId },
            }),
        }),
    }),
});

export const {
    useGetMyProfileViewsQuery,
    useAddProfileViewMutation
} = profileViewApi;
