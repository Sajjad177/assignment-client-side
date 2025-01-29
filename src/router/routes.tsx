import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import dashboardRoute from "./dashboardRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: dashboardRoute,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
