import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/ProductManagement/productManagement";
import { Form } from "./ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleProductQuery(id);
  const product = data?.data;

  const { register, handleSubmit, setValue, form } = useForm({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      brand: product?.brand || "",
      image: product?.image || "",
      quantity: product?.quantity || "",
      category: product?.category || "",
    },
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("brand", product.brand);
      setValue("image", product.image);
      setValue("quantity", product.quantity);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  const handleSelectChange = (value: string, field: string) => {
    setValue(field, value);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating Product...");
    try {
      const res = await updateProduct({ id, ...data }).unwrap();
      console.log(res);
      toast.success("Product updated successfully", { id: toastId });
      navigate("/dashboard/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center p-4 dark:bg-gray-900 overflow-hidden">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
            Edit Product
          </h2>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* Product Name */}
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price")}
                  placeholder="Enter price"
                />
              </div>

              {/* Brand */}
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  {...register("brand")}
                  placeholder="Enter brand name"
                />
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="Enter image URL"
                />
              </div>

              {/* Quantity */}
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  {...register("quantity")}
                  placeholder="Enter quantity"
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "category")
                  }
                  defaultValue={product?.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Office Supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="Art Supplies">Art Supplies</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Update Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
