import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AgentRoute = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (user?.userIsLogin && user?.userRole === "agent") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace={true} />;
};

AgentRoute.propTypes = {
  children: PropTypes.node,
};

export default AgentRoute;
