import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUserId: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshAuthState: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAdmin: false,
  currentUserId: null,
  login: () => {},
  logout: () => {},
  refreshAuthState: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
      try {
        const response = await getCurrentUser(token);
        const user = await response.data;

        if (!user.active) {
          logout();
          window.location.reload();
        }

        setIsAuthenticated(user.active);
        setIsAdmin(user.admin);
        setCurrentUserId(user._id);
      } catch {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        currentUserId,
        login,
        logout,
        refreshAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
