import { apiSlice } from './apiSlice';

export const preferencesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreferences: builder.query<any, void>({
      query: () => ({
        url: 'preferences/',
        method: 'GET',
      }),
      providesTags: ['Preferences'],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('preferencesApi data:', data);
        } catch (err) {
          console.error('preferencesApi error:', err);
        }
      },
    }),
    updatePreferences: builder.mutation<any, any>({
      query: (data) => ({
        url: 'preferences/',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Preferences'],
    }),
  }),
});

export const {
  useGetPreferencesQuery,
  useUpdatePreferencesMutation
} = preferencesApi;
