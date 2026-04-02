import { apiSlice } from './apiSlice';

export const formuploadapi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
     // File upload using FormData
    uploadFile: build.mutation({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/files/upload',
          method: 'POST',
          body: formData,
          
        };
      },
    }),

    // File delete
    deleteFile: build.mutation({
      query: ({ publicId }) => ({
        url: '/files/delete',
        method: 'DELETE',
        body: { publicId },
        
      }),
    }),
})

})

export const {useUploadFileMutation,
  useDeleteFileMutation}=formuploadapi;