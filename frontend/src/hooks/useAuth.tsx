import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config/api";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Example of using the token in an API call
export const useApi = () => {
  const { token } = useAuth();

  const apiClient = axios.create({
    baseURL: api + "",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return apiClient;
};
