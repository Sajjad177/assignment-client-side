import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllOrdersQuery } from "@/redux/features/Order/OrderManagement";
import { useGetAllProductsQuery } from "@/redux/features/ProductManagement/productManagement";
import { useGetAllUsersQuery } from "@/redux/features/user/userManagement";
import { Trash } from "lucide-react";

const Orders = () => {
  const { data: OrderData } = useGetAllOrdersQuery(undefined);
  const { data: UserData } = useGetAllUsersQuery(undefined);
  const { data: ProductData } = useGetAllProductsQuery(undefined);

  const orderDataList = OrderData?.data || [];
  const userList = UserData?.data || [];
  const productList = ProductData?.data || [];

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
                    <TableCell className="px-4 py-3">{order.status}</TableCell>
                    <TableCell className="px-4 py-3 flex justify-center gap-2">
                      <Button
                        title="Delete"
                        variant="outline"
                        className="p-2 text-red-500"
                        //   onClick={() => handleDeleteProduct(order._id)}
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
