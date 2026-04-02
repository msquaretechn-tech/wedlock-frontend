import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { setCredentials, logout } from '../Reducers/user.reducer';


const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/v1/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).userReducer.accessToken;
        if (accessToken) {
            headers.set('Authorization', accessToken);
        }
        return headers;
    }
});


export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        console.log("refreshing token");
        const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
        console.log(refreshResult?.data, "refreshResult");
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("refresh token failed");
            api.dispatch(logout());
        }
    }

    return result;
}




export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Preferences'],
    endpoints: () => ({}),
});

