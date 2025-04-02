import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";
import { api } from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: "organization" | "recruiter" | "candidate"
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "organization" | "recruiter" | "candidate"
  ) => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
        role,
      });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
