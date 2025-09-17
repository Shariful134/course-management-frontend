/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TqueryParams, TResponseRedux } from "@/type/types";
import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TqueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/auth/get",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],

      transformResponse: (response: TResponseRedux<any>) => ({
        data: response?.Data,
        meta: response?.meta,
      }),
    }),
  }),
});
export const { useGetAllUserQuery, useDeleteUserMutation } = userApi;
