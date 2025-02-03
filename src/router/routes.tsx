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
import ContractUs from "@/components/ContractUs";
import Register from "@/pages/Register";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ErrorPage from "@/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
    path: "/contact",
    element: <ContractUs />,
  },

  {
    path: "/cart/:id",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders/verify",
    element: (
      <ProtectedRoute>
        {" "}
        <PaymentSuccess />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
