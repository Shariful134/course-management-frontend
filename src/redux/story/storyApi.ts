/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TqueryParams, TResponseRedux } from "@/type/types";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStory: builder.mutation({
      query: (data) => ({
        url: "/success-stories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["story"],
    }),
    // updateCourse: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/courses/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["course"],
    // }),
    // deleteCourse: builder.mutation({
    //   query: (id) => ({
    //     url: `/courses/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["course"],
    // }),
    getAllStories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TqueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/success-stories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["story"],

      transformResponse: (response: TResponseRedux<any>) => ({
        data: response?.Data,
        meta: response?.meta,
      }),
    }),
    getSingleStories: builder.query({
      query: (id) => ({
        url: `/success-stories/${id}`,
        method: "GET",
      }),
      providesTags: ["story"],
    }),
  }),
});
export const {
  useCreateStoryMutation,
  useGetAllStoriesQuery,
  useGetSingleStoriesQuery,
} = authApi;
