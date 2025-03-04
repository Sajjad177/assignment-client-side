import { baseApi } from "../../api/baseApi";
import { connectSocket } from "../socket/socketSlice";

const authAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],

      async onQueryStarted(userInfo, { dispatch, queryFulfilled  }) {
        // console.log("Login Request:", userInfo);
        try {
          console.log("Login Request:");
          const { data } = await queryFulfilled;
          // console.log("Login Response:", data);

          const token = data?.data?.token;
          if (token) {
            console.log("Connecting to socket with token:", token);
            dispatch(connectSocket({ token })); // Now only dispatching token, not the socket object
          } else {
            console.error("Login response does not contain a token.");
          }
        } catch (error) {
          console.error("Login Error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authAPi;
