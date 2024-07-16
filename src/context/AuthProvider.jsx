import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
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
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      setLoading(false);
    }
  }, [data]);

  const userData = { user, loading };

  console.log("userData auth provider", userData);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
