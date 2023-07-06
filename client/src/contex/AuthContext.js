import { createContext, useState, useEffect } from "react";
import { CircularIndeterminate } from "../components/CircularIndeterminate";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
 
  const token = JSON.parse(localStorage.getItem("access-token"));
  useEffect(() => {
    setLoading(true)
    getData()
  }, [token]);
  const getData=()=>{
    axios
    .post("http://localhost:8080/api/webuser/token", {
      token,
    })
    .then((response) => {
      setLoggedIn(true);
      setUser(response.data.user)
      setLoading(false)
    })
    .catch(() => {
      setLoggedIn(false);
      setUser(null)
      if (localStorage.getItem("access-token")!=null) {
        localStorage.removeItem("access-token");
      }
      setLoading(false)
    });
  }
  const handlerLogInOut = (status, redirect, token = null) => {
    setLoggedIn(status);
    if (status) {
      localStorage.setItem("access-token", JSON.stringify(token));
    } else {
      localStorage.removeItem("access-token");
    }
    redirect();
  };

  const values = {
    handlerLogInOut,
    loggedIn,
    user,
    loading
  };
  if (loading) {
    return(
      <CircularIndeterminate/>
    )
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
