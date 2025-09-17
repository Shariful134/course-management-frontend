/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    registerUser: builder.mutation({
      query: (userInfo: any) => ({
        url: "/auth/register-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    Login: builder.mutation({
      query: (userInfo: any) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});
export const { useRegisterUserMutation, useLoginMutation } = authApi;
