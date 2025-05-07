import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getUserInfo, clearAuthData } from '../utils/storage';

const AuthContext = createContext(null);

export const LOGOUT_EVENT = 'app:logout';

const isTokenExpired = (token) => {
  try{
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    // console.log('Token expiration time:', new Date(expirationTime).toLocaleString());
    // console.log('Current time:', new Date(Date.now()).toLocaleString());
    return Date.now() > expirationTime;
  } catch (e) {
    console.error('Error parsing token:', e);
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    const userInfo = getUserInfo();
    if (token && userInfo && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      setUser(userInfo);
    }
    else {
      logout();
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    clearAuthData();
    window.dispatchEvent(new Event(LOGOUT_EVENT));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};