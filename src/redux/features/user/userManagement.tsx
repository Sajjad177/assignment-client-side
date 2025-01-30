import { baseApi } from "../../api/baseApi";

const userManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    })
  }),
});

export const { useGetAllUsersQuery } = userManagement;
