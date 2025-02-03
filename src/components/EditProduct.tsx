import { useEffect, useState } from "react";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { UploadCloud } from "lucide-react";

type ProductFormValues = {
  name: string;
  price: number;
  brand: string;
  image: File | string;
  quantity: number;
  category: string;
  description: string;
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleProductQuery(id);
  const product = data?.data;

  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: 0,
      brand: "",
      image: "",
      quantity: 0,
      category: "",
      description: "",
    },
  });

  const { register, handleSubmit, setValue } = form;
  const [updateProduct] = useUpdateProductMutation();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("brand", product.brand);
      setValue("image", product.image);
      setValue("quantity", product.quantity);
      setValue("category", product.category);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const handleSelectChange = (
    value: string,
    field: keyof ProductFormValues
  ) => {
    setValue(field, value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const toastId = toast.loading("Updating Product...");
    try {
      const formData = new FormData();

      // append data and image
      formData.append("data", JSON.stringify(data));
      formData.append("image", data.image);

      await updateProduct({ id, data: formData }).unwrap();
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

              {/* Image Uploader add there */}
              <div className="space-y-2">
                <Label htmlFor="image"> Image</Label>
                <div
                  className="border-dashed border-2 border-gray-300 p-4 rounded-lg flex flex-col items-center cursor-pointer hover:border-gray-500"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <UploadCloud className="w-6 h-6 text-gray-500" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      handleImageChange(event);
                      const file = event.target.files?.[0];
                      if (file) {
                        setValue("image", file);
                      }
                    }}
                  />

                  {image && (
                    <p className="text-sm mt-2 text-gray-700">{image.name}</p>
                  )}
                </div>
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

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
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
