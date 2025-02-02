import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyOrdersQuery } from "@/redux/features/Order/OrderManagement";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetMyOrdersQuery(user?.userId);
  const orderDataList = data?.data || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {orderDataList.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orderDataList.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-4">
                    <img
                      src={order?.product?.image}
                      alt={order?.product?.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <span>Product: {order?.product?.name}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="font-semibold">Amount:</span>
                  <span>{order?.product?.price}</span>
                  <span className="font-semibold">Status:</span>
                  <Badge
                    className={
                      order?.payment_status === "Paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {order?.payment_status}
                  </Badge>
                  <span className="font-semibold">Date:</span>
                  <span>{order?.transaction?.date_time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
