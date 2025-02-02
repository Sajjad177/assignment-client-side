import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import {
  useDeletedOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/Order/OrderManagement";
import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";
import { useGetAllUsersQuery } from "@/redux/features/user/userManagement";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const Orders = () => {
  const { data: OrderData } = useGetAllOrdersQuery(undefined);
  const { data: UserData } = useGetAllUsersQuery(undefined);
  const { data: ProductData } = useGetAllProductsQuery(undefined);

  const [deletedOrder] = useDeletedOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orderDataList = OrderData?.data || [];
  const userList = UserData?.data || [];
  const productList = ProductData?.data || [];

  // update order status
  const handelUpdateOrderStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating Order Status...");
    try {
      const res = await updateOrderStatus({ id, data: { status } }).unwrap();
      if (res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status", { id: toastId });
    }
  };

  // delete order handler
  const handleDeleteOrder = async (id: string) => {
    const toastId = toast.loading("Deleting Order...");
    try {
      const res = await deletedOrder(id).unwrap();
      console.log(res);
      if (res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order", { id: toastId });
    }
  };

  return (
    <div>
      <div className="mt-6 overflow-x-auto">
        <Table className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <TableHead className="px-4 py-3">Product Name</TableHead>
              <TableHead className="px-4 py-3">User Name</TableHead>
              <TableHead className="px-4 py-3">Category</TableHead>
              <TableHead className="px-4 py-3">Quantity</TableHead>
              <TableHead className="px-4 py-3">Payment</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDataList.length > 0 ? (
              orderDataList.map((order: any) => {
                const user = userList.find((u: any) => u._id === order.user);

                const product = productList.find(
                  (p: any) => p._id === order.product
                );

                return (
                  <TableRow
                    key={order._id}
                    className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <TableCell className="px-4 py-3">
                      {product?.name || "Unknown Product"}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {user?.name || "Unknown User"}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {product?.category || "N/A"}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {order.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {order.payment_status}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Select
                        onValueChange={(value) =>
                          handelUpdateOrderStatus(order._id, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={order.status}
                            className={cn(
                              "px-2 py-1 rounded text-center",
                              order.status === "Pending" &&
                                "text-yellow-500 font-semibold",
                              order.status === "Shipping" &&
                                "text-blue-500 font-semibold",
                              order.status === "Delivered" &&
                                "text-green-500 font-semibold",
                              order.status === "Cancelled" &&
                                "text-red-500 font-semibold"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="Pending"
                            className="text-yellow-500"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            value="Shipping"
                            className="text-blue-500"
                          >
                            Shipping
                          </SelectItem>
                          <SelectItem
                            value="Delivered"
                            className="text-green-500"
                          >
                            Delivered
                          </SelectItem>
                          <SelectItem
                            value="Cancelled"
                            className="text-red-500"
                          >
                            Cancelled
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="px-4 py-3 flex justify-center gap-2">
                      <Button
                        title="Delete"
                        variant="outline"
                        className="p-2 text-red-500"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
