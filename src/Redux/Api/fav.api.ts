
import { apiSlice } from './apiSlice';

export const favApi = apiSlice.injectEndpoints({
   


    endpoints: (builder) => ({
        toggleFav: builder.mutation({
            query: (favoritedUserId) => ({
                url: '/profile/favorite/toggleFav',
                method: 'POST',
                body: { favoritedUserId: favoritedUserId }
            }),
        }),

       getFav: builder.query({
            query: () => ({
                url: '/profile/favorite/getFavProfile',
                method: 'GET'
            }),
        }),
      
    }),


})


export const { useToggleFavMutation,useGetFavQuery } = favApi