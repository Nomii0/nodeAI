import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Chat from "../pages/Chat";
import Home from "../pages/HomePage";
import Root from "../layout/root";
// import DashboardLayout from "../layout/dashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chat/:id",
            element: <Chat />,
          },
        ],
      },
      {
        path: "/sign-in/*",
        element: <SignIn />,
      },
      {
        path: "/sign-up/*",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
