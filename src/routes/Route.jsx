import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import SystemMonitoringPage from "../pages/AdminPages/SystemMonitoringPage";
import UserManagementPage from "../pages/AdminPages/UserManagementPage";
import TransactionManagementPage from "../pages/AgentPages/TransactionManagementPage";
import BlanceInquiryPage from "../pages/commonPages/BlanceInquiryPage";
import ErrorPage from "../pages/commonPages/ErrorPage";
import HomePage from "../pages/commonPages/HomePage";
import LoginPage from "../pages/commonPages/LoginPage";
import RegisterPage from "../pages/commonPages/RegisterPage";
import TransactionHistory from "../pages/commonPages/TransactionHistory";
import CashInPage from "../pages/userPages/CashInPage";
import CashOutPage from "../pages/userPages/CashOutPage";
import SendMonyPage from "../pages/userPages/SendMonyPage";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
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
        element: (
          // <PrivateRoute>
          <HomePage />
          // </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },

      // noraml user private routes

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

      // agent route

      {
        path: "transaction-management",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <TransactionManagementPage />
            </AgentRoute>
          </PrivateRoute>
        ),
      },

      // admin routes

      {
        path: "user-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserManagementPage />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "system-monitoring",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SystemMonitoringPage />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
