
import { apiSlice } from './apiSlice';

export interface ProfilePercentage {
  percentage: number;
}


 export const profileApi = apiSlice.injectEndpoints({
   
  endpoints: (builder) => ({
    myDetails: builder.query<void, void>({
      query: () => ({
        url: 'profile/mydetails',
      }),
    }),

    updatePersonalDetails: builder.mutation({
      query: (data) => ({
        url: 'profile/updatePersonalDetails',
        method: 'PUT',
        body: data,
      }),
    }),

    updateFamilyDetails: builder.mutation({
      query: (data) => ({
        url: 'profile/updateFamilyDetails',
        method: 'PUT',
        body: data,
      }),
    }),

    updatePersonalBackground: builder.mutation({
      query: (data) => ({
        url: 'profile/updatePersonalBackground',
        method: 'PUT',
        body: data,
      }),
    }),
    
    updateReligiousBackground: builder.mutation({
      query: (data) => ({
        url: 'profile/updateReligiousBackground',
        method: 'PUT',
        body: data,
      }),
    }),

    updateLocationDetails: builder.mutation({
      query: (data) => ({
        url: 'profile/updateLocationDetails',
        method: 'PUT',
        body: data,
      }),
    }),

    updateEducationAndFinancialDetails: builder.mutation({
      query: (data) => ({
        url: 'profile/updateEducationAndFinancialDetails',
        method: 'PUT',
        body: data,
      }),
    }),

    getProfiles : builder.query({
      query: (filters) => ({
        url: 'profile/filtered-profiles',
        method: 'GET',
        params: filters,

      }),
    }),

    userByid: builder.mutation({
      query: (userId) => ({
        url: 'profile/getUserDetails',
        method: 'POST',
        body: { userId },
      }),
      
    }),

    filterProfles: builder.mutation({
      query: (data) => ({
        url: 'profile/filterProfiles',
        method: 'POST',
        body: data,
      }),
    }),

    filterFieldCount: builder.query({
      query: (data) => ({
        url: 'profile/filterFieldCount',
        method: 'POST',
        body: data,
      }),
    }),
    getUserImage:builder.query<void, void>({
      query:()=> ({
        url:'profile/getuserImage',
        method:'GET',

      }),
    }),
    
  getProfilePercentage:builder.query<ProfilePercentage, void>({
    query:()=> ({
      url:'profile/getProfilePercentage',
      method:'GET',
    })
    
  }),
  contactNumberByUserId: builder.query({
  query: (userId) => ({
    url: 'profile/contact/' + userId,
    method: 'GET',
  }),
}),

updateContactNumber: builder.mutation({
  query: ({ userId, contactNumber }) => ({
    url: 'profile/contact/' + userId,
    method: 'PUT',
    body: { contactNumber },
  }),
}),


  }),
 
});

 export const { useMyDetailsQuery,useUpdateEducationAndFinancialDetailsMutation,
  useUpdateFamilyDetailsMutation,useUpdateLocationDetailsMutation,
  useUpdatePersonalBackgroundMutation,useUpdatePersonalDetailsMutation,
  useUpdateReligiousBackgroundMutation,useGetProfilesQuery,useUserByidMutation 
  ,useFilterProflesMutation,useFilterFieldCountQuery,useGetUserImageQuery,
  useGetProfilePercentageQuery,useContactNumberByUserIdQuery,useUpdateContactNumberMutation
} = profileApi;

