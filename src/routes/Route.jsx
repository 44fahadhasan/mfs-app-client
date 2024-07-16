import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/commonPages/ErrorPage";
import HomePage from "../pages/commonPages/HomePage";
import LoginPage from "../pages/commonPages/LoginPage";
import RegisterPage from "../pages/commonPages/RegisterPage";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  // main layout routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      // public routes
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      // user private routes
      {
        path: "home",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
