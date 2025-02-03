import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router";
import { useVerifyOrderQuery } from "@/redux/features/Order/OrderManagement";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Navbar from "../Navbar";
import PageLoading from "../PageLoading";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const PaymentSuccess = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useVerifyOrderQuery(
    searchParams.get("order_id")!,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: OrderData = data?.data?.[0];

  if (isLoading) {
    <div className="text-center mt-20">
      <PageLoading />
    </div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 max-w-4xl font-primaryFront">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Order Verification
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <dt className="font-semibold">Order ID:</dt>
                <dd>{orderData?.order_id}</dd>
                <dt className="font-semibold">Amount:</dt>
                <dd>
                  {orderData?.currency} {orderData?.amount?.toFixed(2)}
                </dd>
                <dt className="font-semibold">Status:</dt>
                <dd>
                  <Badge
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded-full",
                      orderData?.bank_status === "Success"
                        ? "bg-[#77B254] text-white"
                        : "bg-red-500 text-white"
                    )}
                  >
                    {orderData?.bank_status}
                  </Badge>
                </dd>
                <dt className="font-semibold">Date:</dt>
                <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <dt className="font-semibold">Method:</dt>
                <dd>{orderData?.method}</dd>
                <dt className="font-semibold">Transaction ID:</dt>
                <dd>{orderData?.bank_trx_id}</dd>
                <dt className="font-semibold">Invoice No:</dt>
                <dd>{orderData?.invoice_no}</dd>
                <dt className="font-semibold">SP Code:</dt>
                <dd>{orderData?.sp_code}</dd>
                <dt className="font-semibold">SP Message:</dt>
                <dd>{orderData?.sp_message}</dd>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderData?.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderData?.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{orderData?.phone_no}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd>{orderData?.address}</dd>
              <dt className="font-semibold">City:</dt>
              <dd>{orderData?.city}</dd>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
