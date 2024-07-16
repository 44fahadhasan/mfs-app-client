import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/commonPages/ErrorPage";
import HomePage from "../pages/commonPages/HomePage";
import LoginPage from "../pages/commonPages/LoginPage";
import RegisterPage from "../pages/commonPages/RegisterPage";
import BlanceInquiryPage from "../pages/commonPages/userPages/BlanceInquiryPage";
import CashInPage from "../pages/commonPages/userPages/CashInPage";
import CashOutPage from "../pages/commonPages/userPages/CashOutPage";
import SendMonyPage from "../pages/commonPages/userPages/SendMonyPage";
import TransactionHistory from "../pages/commonPages/userPages/TransactionHistory";
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
      {
        path: "send-mony",
        element: (
          <PrivateRoute>
            <SendMonyPage />
          </PrivateRoute>
        ),
      },
      {
        path: "cash-in",
        element: (
          <PrivateRoute>
            <CashInPage />
          </PrivateRoute>
        ),
      },
      {
        path: "cash-out",
        element: (
          <PrivateRoute>
            <CashOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "balance-inquiry",
        element: (
          <PrivateRoute>
            <BlanceInquiryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <PrivateRoute>
            <TransactionHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
