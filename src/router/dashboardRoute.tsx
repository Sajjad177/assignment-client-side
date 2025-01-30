import EditProduct from "@/components/EditProduct";
import Orders from "@/pages/Dashboard/Orders";
import Products from "@/pages/Dashboard/Products";
import Profile from "@/pages/Dashboard/Profile";
import Users from "@/pages/Dashboard/Users";

const dashboardRoute = [
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "users",
    element : <Users/>
  },
  {
    path : "products",
    element : <Products/>
  },
  {
    path : "edit-product/:id",
    element : <EditProduct/>
  },
  {
    path: "orders",
    element : <Orders/>
  },
];

export default dashboardRoute;
