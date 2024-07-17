import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [identifier, setIdentifier] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("cruntUserIdentifier");
    setIdentifier(data);
  }, []);

  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["specificUserInfo", identifier],
    enabled: !!identifier,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${identifier}`);
      return res?.data;
    },
    refetchInterval: 1,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setLoading(false);
    }
  }, [data]);

  const handleLogout = () => {
    axiosSecure
      .patch(`/logout/${user?.email}`)
      .then(({ data }) => {
        if (data?.acknowledged) {
          //
          localStorage.removeItem("token");
          localStorage.removeItem("cruntUserIdentifier");
          //
          toast.success("Logout successfully", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          //
        } else {
          toast.error("Something wrong", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch(({ message }) => {
        toast.error(message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  const userData = { user, loading, handleLogout };
  console.log("userData auth provider", userData);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
