import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/features/ProductManagement/productManagement";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useGetAllUsersQuery } from "@/redux/features/user/userManagement";

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductQuery(id);

  const product = data?.data;
  const { data: allUser } = useGetAllUsersQuery(undefined);
  const users = allUser?.data;

  const user = users?.find((user: any) => user._id === product?.author);

  if (!product)
    return <p className="text-center text-lg font-semibold py-8">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 font-primaryFront">
      {/* Product Image Section */}
      <div className="flex justify-center items-center p-4 bg-gray-50 rounded-lg h-full">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full max-w-lg object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details Section */}
      <div className="p-6 space-y-6 bg-white rounded-lg shadow-sm h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p
              className={`text-sm font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1 text-yellow-400 mt-2">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="w-5 h-5" fill="currentColor" />
            ))}
            <span className="text-gray-600 ml-2">(5 Reviews)</span>
          </div>

          {/* Product Description */}
          <p className="text-gray-700 leading-relaxed mt-4">
            {product.description}
          </p>

          {/* Brand */}
          <p className="text-lg font-semibold text-gray-800 mt-4">
            Brand: <span className="text-gray-600">{product.brand}</span>
          </p>

          {/* Price */}
          <p className="text-2xl font-bold text-teal-600 mt-4">
            ${product.price}
          </p>

          {/* Category */}
          <p className="text-gray-700 mt-4">
            Category: <span className="text-gray-600">{product.category}</span>
          </p>

          {/* Available Quantity */}
          <p className="text-gray-700 mt-4">
            Available Quantity:{" "}
            <span className="text-gray-600">{product.quantity}</span>
          </p>

          {/* Author */}
          <p className="text-gray-700 mt-4">
            Author: <span className="text-gray-600">{user?.name}</span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex space-x-4 mt-6">
          <Link to={`/cart/${product._id}`}>
            <Button
              className={`flex items-center space-x-2 ${
                product.inStock
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white py-3 px-6 rounded-lg transition-colors duration-300`}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
