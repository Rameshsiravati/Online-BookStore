import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('user');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (user) => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // ✅ FINAL ADMIN CHECK
  // const isAdmin = () => {
  //   if (!currentUser) return false;
  //   return Array.isArray(currentUser.roles) &&
  //          currentUser.roles.includes('ADMIN');
  // };
  const isAdmin = () => currentUser?.roles?.includes('ADMIN');

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAdmin, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
