import { baseApi } from "../../api/baseApi";

const productManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useAddProductMutation } = productManagement;
