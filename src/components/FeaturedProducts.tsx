import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const FeaturedProducts = () => {
  const { data: ProductData } = useGetAllProductsQuery(undefined);
  const productList = ProductData?.data?.slice(0, 4) || [];

  return (
    <div className="py-16 bg-gray-100 font-primaryFront ">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {productList.map((product: any) => (
          <Card
            key={product._id}
            className="shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
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
      <div className="flex justify-center mt-8">
        <Link to="/all-products">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow-md">
            View All Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
