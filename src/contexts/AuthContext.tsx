import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useGoogleLogin } from "@react-oauth/google";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {}
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const credential = localStorage.getItem("credential");
    if (credential) {
      api
        .post(
          "/auth/google/token",
          { credential },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("credential");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("credential");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
