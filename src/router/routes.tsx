import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import dashboardRoute from "./dashboardRoute";
import AllProducts from "@/pages/AllProducts";
import ProductDetails from "@/components/ProductDetails";
import Cart from "@/pages/Cart";
import PaymentSuccess from "@/components/Payment/PaymentSuccess";
import OurStory from "@/components/ReleventFeatures";
// import MainLayout from "@/components/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainLayout />,
    element: <App />,
    // children: [
    //   {
    //     path: "/all-products",
    //     element: <AllProducts />,
    //   },
    //   {
    //     path: "/products/:id",
    //     element: <ProductDetails />,
    //   },
    // ],
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
    path: "/about-us",
    element: <OurStory />,
  },
  {
    path: "/cart/:id",
    element: <Cart />,
  },
  {
    path: "/orders/verify",
    element: <PaymentSuccess />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
