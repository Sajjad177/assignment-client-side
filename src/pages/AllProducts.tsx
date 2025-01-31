import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/ProductManagement/productManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data: ProductData } = useGetAllProductsQuery(undefined);
  const productList = ProductData?.data || [];

  return (
    <div className="container mx-auto p-6 font-primaryFront">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
      <div>
        <Link to="/">
          <div className="bg-teal-600 hover:bg-teal-700 flex items-center text-white w-fit rounded-md cursor-pointer mb-4">
            <ChevronLeft className="w-6 h-6" />
            Back
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.map((product: any) => (
          <Card
            key={product._id}
            className="shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={product?.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-gray-800 font-bold mt-2">
                Price: ${product.price}
              </p>
              <Link to={`/products/${product._id}`}>
                <Button className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
