import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
