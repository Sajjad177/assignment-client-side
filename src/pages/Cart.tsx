import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSingleProductQuery } from "@/redux/features/ProductManagement/productManagement";
import { ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAddOrderMutation } from "@/redux/features/Order/OrderManagement";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/userManagement";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Cart = () => {
  const { id } = useParams();
  const { data: productData } = useGetSingleProductQuery(id);
  const product = productData?.data;

  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetSingleUserQuery(user?.userId);
  const userDetails = userData?.data;

  const [addOrder] = useAddOrderMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: "1",
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (userDetails) {
      setValue("name", userDetails.name);
      setValue("email", userDetails.email);
    }
  }, [userDetails, setValue]);

  const selectedQuantity = Number(watch("quantity"));
  const totalPrice = (product?.price || 0) * selectedQuantity;

  const quantityOptions = Array.from(
    { length: product?.quantity || 1 },
    (_, index) => index + 1
  );

  const onSubmit = async (data: any) => {
    const orderData = {
      ...data,
      product: product?._id,
      quantity: Number(data.quantity),
      totalPrice,
    };

    try {
      const toastId = toast.loading("Placing Order...");
      const response = await addOrder(orderData).unwrap();
      console.log("Order response:", response);
      if (response?.data?.checkout_url) {
        setTimeout(() => {
          window.location.replace(response?.data?.checkout_url);
        }, 1000);
      }
      toast.success("Order placed successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 font-primaryFront mt-10">
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-20 h-28 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium">{product?.name}</h4>

                <div className="mt-2">
                  <label className="text-sm text-gray-600">Quantity:</label>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => setValue("quantity", value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-24 mt-1">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {quantityOptions.map((qty) => (
                            <SelectItem key={qty} value={qty.toString()}>
                              {qty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <p className="text-lg font-semibold mt-2">
                  ${product?.price?.toFixed(2)}
                </p>
              </div>
            </CardContent>
            <hr className="my-4" />
            <p className="text-lg font-semibold flex justify-between">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
          </Card>

          {/* Shipping Details Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>

              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}

                <Input
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}

                <Input
                  type="tel"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    Phone number is required
                  </p>
                )}

                <Input
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">Address is required</p>
                )}

                <div className="flex gap-4">
                  <Input
                    placeholder="City"
                    {...register("city", { required: true })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">City is required</p>
                  )}

                  <Input
                    placeholder="Postal Code"
                    {...register("postalCode", { required: true })}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">
                      Postal code is required
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
