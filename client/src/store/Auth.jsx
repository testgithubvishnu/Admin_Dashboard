import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [services, setService] = useState("");

  const storeTokenInLS = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let isLoggedIn = !!token;
  // console.log("token", token);
  console.log("isLoggedIn", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const URL = "http://localhost:5000/api/auth/user";

  // To get currntly LoggedIn data:
  const userAuthentication = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // To get the services:
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/services", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setService(data);
      }
    } catch (err) {
      console.log(`services frontend error:${err}`);
    }
  };

  useEffect(() => {
    getServices(), userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
