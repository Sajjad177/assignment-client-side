import { useState } from "react";
import ProductAddDialog from "@/components/ProductAddDialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAddProductMutation } from "@/redux/features/ProductManagement/productManagement";
import { toast } from "sonner";

const Products = () => {
  const [addProduct] = useAddProductMutation();

  const [open, setOpen] = useState(false);
  const form = useForm();

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding Product...");
    try {
      console.log("Submitted Data:", data);
      const res = await addProduct(data).unwrap();
      console.log(res);

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductAddDialog
          open={open}
          setOpen={setOpen}
          form={form}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default Products;
