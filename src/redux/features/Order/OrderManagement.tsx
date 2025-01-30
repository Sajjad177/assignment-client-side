import { baseApi } from "@/redux/api/baseApi";

const OrderManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetAllOrdersQuery } = OrderManagement;