import React, { createContext, useContext, useState } from "react";
import * as api from "./api";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

/**
 * Provides authentication context for children components.
 */
export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("username") || "");

  // PUBLIC_INTERFACE
  async function handleLogin(username, password) {
    const result = await api.login(username, password);
    if (result.success) {
      setLoggedIn(true);
      setUser(username);
      localStorage.setItem("username", username);
    }
    return result;
  }

  // PUBLIC_INTERFACE
  async function handleRegister(username, password) {
    const result = await api.register(username, password);
    if (result.success) {
      // Auto-login after registration
      return await handleLogin(username, password);
    }
    return result;
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    api.logout();
    setLoggedIn(false);
    setUser("");
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
