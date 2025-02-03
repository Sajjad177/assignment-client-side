import { baseApi } from "../../api/baseApi";

const userManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Userdetails"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useBlockUserMutation,
  useUpdateUserDetailsMutation
} = userManagement;
