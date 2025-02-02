import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";

const Featured = () => {
    const {data: ProductData} = useGetAllProductsQuery(undefined);
    const productList = ProductData?.data || [];
    // console.log(productList);
    return (
        <div>
            
        </div>
    );
};

export default Featured;