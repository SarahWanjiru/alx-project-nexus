import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const data = await api.auth.register({
        username: userData.email.split('@')[0],
        email: userData.email,
        first_name: userData.fullName.split(' ')[0],
        last_name:
          userData.fullName.split(' ').slice(1).join(' ') ||
          userData.fullName.split(' ')[0],
        password: userData.password,
        role: userData.role || 'user',
        phone_number: null,
      });

      if (data.user_id) {
        const loginData = await api.auth.login({
          username: userData.email.split('@')[0],
          password: userData.password,
        });

        if (loginData.access) {
          localStorage.setItem('access_token', loginData.access);
          localStorage.setItem('refresh_token', loginData.refresh);
          const userInfo = {
            email: userData.email,
            role: userData.role || 'user',
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
          setUser(userInfo);
          return { success: true, role: userData.role || 'user' };
        }
      }
      return { success: false, error: data.error || 'Signup failed' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await api.auth.login({
        username: credentials.email.split('@')[0],
        password: credentials.password,
      });

      if (data.access) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        try {
          // Fetch current user's profile to get role
          const userProfile = await api.profile.getMe();
          const userRole = userProfile.user?.role || 'user';

          const userData = { email: credentials.email, role: userRole };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return { success: true, role: userRole };
        } catch {
          const userData = { email: credentials.email, role: 'user' };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return { success: true, role: 'user' };
        }
      }
      return { success: false, error: data.detail || 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await api.auth.logout(refreshToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
