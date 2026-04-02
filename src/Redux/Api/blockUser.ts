import { apiSlice } from "./apiSlice";

export const blockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    blockUser: builder.mutation({
      query: (blockedUserId: string) => ({
        url: '/block/block',
        method: 'POST',
        body: { blockedUserId },
      }),
    }),

    unblockUser: builder.mutation({
      query: (blockedUserId: string) => ({
        url: '/block/unblock',
        method: 'POST',
        body: { blockedUserId },
      }),
    }),

    getBlockedUsersByMe: builder.query({
      query: () => ({
        url: '/block/blocked-by-me',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetBlockedUsersByMeQuery,
} = blockApi;
