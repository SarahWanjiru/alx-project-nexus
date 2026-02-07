import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const signup = async (userData) => {
    setLoading(true);
    try {
      console.log('AuthContext: Calling signup API...');
      const response = await api.auth.signup(userData);
      console.log('AuthContext: Signup response:', response);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('AuthContext: Signup error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      console.log('AuthContext: Calling login API...');
      const response = await api.auth.login(credentials);
      console.log('AuthContext: Login response:', response);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, token, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
