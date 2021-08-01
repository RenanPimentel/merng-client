import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const getInitialState = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return { user: null };
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  }

  return { user: decodedToken };
};

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
});

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const login = userData => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  const value = { login, logout, ...state };

  return <AuthContext.Provider value={value} {...props} />;
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      throw new Error("no action found");
  }
}

export { AuthProvider, AuthContext };
