import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user?.userIsLogin && user?.userRole === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace={true} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
