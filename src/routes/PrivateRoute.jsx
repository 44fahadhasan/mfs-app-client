import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user?.userIsLogin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace={true} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
