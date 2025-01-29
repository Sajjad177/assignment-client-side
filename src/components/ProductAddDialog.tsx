import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // ✅ Fix: Correct Label import
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "./ui/form";
import { UseFormReturn } from "react-hook-form";

type ProductFormValues = {
  name: string;
  price: number;
  brand: string;
  quantity: number;
  category: string;
  image ?: string
};

const ProductAddDialog = ({
  open,
  setOpen,
  form, // ✅ Receive form instance from parent
  onSubmit,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<ProductFormValues>; // ✅ Correct Type for form
  onSubmit: (data: ProductFormValues) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form; // ✅ Use parent form instance

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Add your new product here.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register("name", { required: "Product Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                placeholder="Enter brand name"
                {...register("brand", { required: "Brand is required" })}
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand.message}</p>
              )}
            </div>
            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                placeholder="Enter image name"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Category (Dropdown) */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
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
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAddDialog;
