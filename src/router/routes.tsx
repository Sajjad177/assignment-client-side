import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import dashboardRoute from "./dashboardRoute";
import AllProducts from "@/pages/AllProducts";
import ProductDetails from "@/components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: dashboardRoute,
  },
  {
    path: "/all-products",
    element: <AllProducts />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
