

import { apiSlice } from './apiSlice';


interface LogoutResponse {

    success: boolean;
    message: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}





export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'user/registration',
        method: 'POST',
        body: user,
      }),

    }),

    verifyOtp:builder.mutation({
      query : (data)=> ({
        url:'user/activate-user',
        method:'POST',
        body: data
      })
    }),

    setPassword:builder.mutation({
      query : (data)=> ({
        url:'user/set-password',
        method:'POST',
        body: data
      })
    }),

     login: builder.mutation({
      query: (user) => ({
        url: 'user/login',
        method: 'POST',
        body: user, 
      }),
    }),

    forgotpassword:builder.mutation({
      query:(email)=>({
        url: 'user/forgot-password',
        method: 'POST',
        body: email
      })
    }),

    verify:builder.mutation({
      query:(data) => ({
        url: 'user/verify-otp',
        method: 'POST',
        body: data

      })
    }),

    checkSuspendStatus:builder.mutation({
      query:(data)=>({
        url:'user/check-user-suspension',
        method: 'POST',
        body:data
      })
    }),

    resetpassword:builder.mutation({
      query:(data) =>({
        url: 'user/reset-password',
        method: 'POST',
        body: data

      })

    }),

    logoutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'user/logout',
        method: 'GET',
      }),
    }),

    deleteUser: builder.mutation<DeleteResponse, void>({
      query:() => ({
        url: 'user/delete-user',
        method: 'DELETE',
        
      })
    }),

    updateFcmToken:builder.mutation({
      query:(data) => ({
        url: 'user/updateFcmToken',
        method: 'POST',
        body: data
      })
    }),

  }),

});

export const { useRegisterUserMutation,useCheckSuspendStatusMutation,useVerifyOtpMutation,useSetPasswordMutation,useLoginMutation,useLogoutUserMutation,useForgotpasswordMutation,useVerifyMutation,useResetpasswordMutation,useDeleteUserMutation,useUpdateFcmTokenMutation} = userApi;
