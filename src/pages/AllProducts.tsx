
import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductFind from "@/components/ProductFind";
import { useState } from "react";
import Footer from "@/components/Footer";

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
      {/* product find search, filter functions */}
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
      {/* product show here */}
      <div className="container mx-auto p-6 font-primaryFront">
        <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <Card
              key={product._id}
              className="shadow-lg hover:shadow-xl transition duration-300 rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="w-full aspect-[4/3]  overflow-hidden">
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
              <CardContent className="text-center flex flex-col justify-between">
                <p className="text-gray-600">
                  Category:{" "}
                  <span className="font-medium text-teal-600">
                    {product.category}
                  </span>
                </p>
                <p className="text-gray-800 font-bold mt-2">
                  Price: <span className="text-teal-600">${product.price}</span>
                </p>
                <Link to={`/products/${product._id}`}>
                  <Button className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg ">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="lg:mt-[150px] md:mt-[100px] sm:mt-[0px]">
        <Footer />
      </div>
    </div>
  );
};

export default AllProducts;
