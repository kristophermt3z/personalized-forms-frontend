import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshAuthState: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  refreshAuthState: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshAuthState();
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    refreshAuthState();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const refreshAuthState = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token") || "";
      const response = await getCurrentUser(token);
      const user = await response.data;

      setIsAuthenticated(user.active);
      setIsAdmin(user.admin);

      if (!user.active) {
        logout();
        window.location.reload();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, refreshAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
