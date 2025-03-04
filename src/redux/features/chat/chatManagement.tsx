import { baseApi } from "../../api/baseApi";

const chatManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ id, data }) => ({
        url: `/message/${id}`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Chat"],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatManagement;
