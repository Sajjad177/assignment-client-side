import { useState } from "react";
import ProductAddDialog from "@/components/ProductAddDialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/ProductManagement/productManagement";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

const Products = () => {
  const [addProduct] = useAddProductMutation();
  const { data: AllProducts, isLoading } = useGetAllProductsQuery(undefined);

  // Get unique product and category
  const productList = AllProducts?.data || [];
  const uniqueCategories: any[] = [
    "All",
    ...Array.from(new Set(productList.map((product: any) => product.category))),
  ];

  const [open, setOpen] = useState(false);
  const form = useForm();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [category, setCategory] = useState<string>("All");
  const [availability, setAvailability] = useState<string>("All");

  // Filtered Products List
  const filteredProducts = productList.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = product.price <= priceRange;
    const matchesAvailability =
      availability === "All" ||
      (availability === "in_stock" && product.inStock) ||
      (availability === "out_of_stock" && !product.inStock);

    return (
      matchesSearch && matchesCategory && matchesPrice && matchesAvailability
    );
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    try {
      const res = await addProduct(data).unwrap();

      if (res.error) {
        toast.error("Failed to add product", { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }

      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products
        </h1>
        <ProductAddDialog
          open={open}
          setOpen={setOpen}
          form={form} 
          onSubmit={handleFormSubmit}
        />
      </div>

      <div className="p-4 md:p-6">
        <Card className="p-4 md:p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
          <CardContent className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
            {/* Search Field */}
            <Input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />

            {/* Price Range Slider */}
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range: ${priceRange}
              </label>
              <Slider
                defaultValue={[priceRange]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setPriceRange(value[0])}
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map((cat: string) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Availability Filter */}
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Product Table */}
        <div className="mt-6 overflow-x-auto">
          <Table className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <TableHead className="px-4 py-3">Product Name</TableHead>
                <TableHead className="px-4 py-3">Category</TableHead>
                <TableHead className="px-4 py-3">Price</TableHead>
                <TableHead className="px-4 py-3">Availability</TableHead>
                <TableHead className="px-4 py-3 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product: any) => (
                  <TableRow
                    key={product._id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <TableCell className="px-4 py-3">{product.name}</TableCell>
                    <TableCell className="px-4 py-3">
                      {product.category}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      ${product.price}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {product.inStock ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="p-2 text-green-500"
                        >
                          In Stock
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          size="sm"
                          className="p-2 text-red-500"
                        >
                          Out of Stock
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 flex justify-center gap-2">
                      <Button variant="outline" className="p-2 text-blue-500">
                        <Pencil size={16} />
                      </Button>
                      <Button variant="outline" className="p-2 text-red-500">
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Products;
