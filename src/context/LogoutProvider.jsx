import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";

export const LogoutContext = createContext(null);

const LogoutProvider = ({ children }) => {
  const [toogleComponent, setToogleComponent] = useState(false);
  const [admin, setAdmin] = useState(true);
  const [premiumUser, setPremiumUser] = useState(true);

  const { user, userLogOut } = useAuth();

  const { activeUserInfo } = useUserInfo();

  useEffect(() => {
    // toggle for noraml user
    if (user) {
      setToogleComponent(true);
    }

    // toggle for admin
    if (activeUserInfo?.role === "Admin" && toogleComponent) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }

    // toggle for premium user
    if (activeUserInfo?.premium && toogleComponent) {
      setPremiumUser(false);
    } else {
      setPremiumUser(true);
    }
  }, [activeUserInfo?.premium, activeUserInfo?.role, toogleComponent, user]);

  // handle user logout
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        toast.success("successfully Logout");
        setToogleComponent(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const logOutData = {
    toogleComponent,
    handleLogOut,
    admin,
    premiumUser,
  };

  return (
    <LogoutContext.Provider value={logOutData}>
      {children}
    </LogoutContext.Provider>
  );
};

LogoutProvider.propTypes = {
  children: PropTypes.node,
};

export default LogoutProvider;
