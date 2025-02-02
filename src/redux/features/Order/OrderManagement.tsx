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
    deletedOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    verifyOrder: builder.query({
      query: (order_id: string) => ({
        url: `/orders/verify`,
        method: "GET",
        params: { order_id },
      }),
      providesTags: ["Order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getMyOrders: builder.query({
      query: ({ id }) => ({
        url: `/orders/my-orders/${id}`,
        method: "GET",
        params: { id },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useDeletedOrderMutation,
  useUpdateOrderStatusMutation,
  useAddOrderMutation,
  useVerifyOrderQuery,
  useGetSingleOrderQuery,
  useGetMyOrdersQuery,
} = OrderManagement;
