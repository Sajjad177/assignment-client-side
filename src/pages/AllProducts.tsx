/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductFind from "@/components/ProductFind";
import { useState } from "react";

const AllProducts = () => {
  const { data: ProductData } = useGetAllProductsQuery(undefined);
  const productList = ProductData?.data || [];

  const uniqueCategories: any[] = [
    "All",
    ...Array.from(
      new Set(productList.map((product: any) => product?.category))
    ),
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [category, setCategory] = useState<string>("All");
  const [availability, setAvailability] = useState<string>("All");

  // Filtered Products List
  const filteredProducts = productList
    .map((product: any) => ({
      ...product,
      inStock: product.quantity > 0,
    }))
    .filter((product: any) => {
      const matchesSearch = product?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesPrice = product?.price <= priceRange;
      const matchesAvailability =
        availability === "All" ||
        (availability === "in_stock" && product?.inStock) ||
        (availability === "out_of_stock" && !product?.inStock);

      return (
        matchesSearch && matchesCategory && matchesPrice && matchesAvailability
      );
    });

  return (
    <div>
      <Navbar />
      <div className="mt-14">
        <ProductFind
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          availability={availability}
          setAvailability={setAvailability}
          uniqueCategories={uniqueCategories}
        />
      </div>
      <div className="container mx-auto p-6 font-primaryFront">
        <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
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
    </div>
  );
};

export default AllProducts;
