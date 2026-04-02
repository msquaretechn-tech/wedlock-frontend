import { apiSlice } from './apiSlice';

export const formApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    personalDetails: build.mutation({
      query: (data) => ({
        url: '/form/personalDetails',
        method: 'POST',
        body: data,
      }),
    }),

    qualificationDetails: build.mutation({
      query: (data) => ({
        url: '/form/qualificationDetails',
        method: 'POST',
        body: data,
      }),
    }),

    locationDetails: build.mutation({
      query: (data) => ({
        url: '/form/locationDetails',
        method: 'POST',
        body: data,
      }),
    }),

    updateProfileAndBio: build.mutation({
      query: (data) => ({
        url: '/form/update-profile',
        method: 'POST',
        body: data,
      }),
    }),

    otherDetails: build.mutation({
      query: (data) => ({
        url: '/form/otherDetails',
        method: 'POST',
        body: data,
      }),
    }),

    profileImageUpload: build.mutation({
      query: (data) => ({
        url: '/form/profileImageUpload',
        method: 'POST',
        body: data,
      }),
    }),

    contactForm: build.mutation({
      query: (data) => ({
        url: '/contact/contact',
        method: 'POST',
        body: data,
      }),
    }),

   
  }),
});

export const {
  usePersonalDetailsMutation,
  useQualificationDetailsMutation,
  useLocationDetailsMutation,
  useOtherDetailsMutation,
  useProfileImageUploadMutation,
  useContactFormMutation,
  useUpdateProfileAndBioMutation,
  
} = formApi;
