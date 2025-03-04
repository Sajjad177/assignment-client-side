import EditProduct from "@/components/EditProduct";
import ChatHomePage from "@/pages/Dashboard/ChatSection/ChatHomePage/ChatHomePage";
import Gemini from "@/pages/Dashboard/Gemini/Gemini";
import Orders from "@/pages/Dashboard/Orders";
import Products from "@/pages/Dashboard/Products";
import Profile from "@/pages/Dashboard/Profile";
import Users from "@/pages/Dashboard/Users";
import Dashboard from "@/pages/Dashboard/Users/Dashboard";
import MyOrder from "@/pages/Dashboard/Users/MyOrder";

const dashboardRoute = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "orders",
    element: <Orders />,
  },
  {
    path: "orders/:id",
    element: <MyOrder />,
  },
  {
    path: "gemini",
    element: <Gemini />,
  },
  {
    path: "chat-home-page",
    element: <ChatHomePage />,
  },
];

export default dashboardRoute;
