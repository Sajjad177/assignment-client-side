import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";

const AllProducts = () => {
  const { data: ProductData } = useGetAllProductsQuery(undefined);
  const productList = ProductData?.data || [];
  console.log(productList);
  return <div>this is all products</div>;
};

export default AllProducts;
