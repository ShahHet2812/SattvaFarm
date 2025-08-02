import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext(undefined);
const API_BASE_URL = 'http://localhost:8000/api'; // Your backend URL

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Initialize as null
  const [location, setLocation] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This effect runs once on component mount to sync state with localStorage.
    setLoading(true);
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      const savedLocation = localStorage.getItem('location');

      // --- SUGGESTION IMPLEMENTED ---
      // Check for a valid token and user data before setting the state.
      // This prevents errors if 'user' is missing, null, or the string "undefined".
      if (savedToken && savedUser && savedUser !== 'undefined') {
        setUser(JSON.parse(savedUser)); // This is now safe
        setToken(savedToken);
        if (savedLocation) {
          setLocation(savedLocation);
        }
      }
    } catch (e) {
      // If parsing fails for any reason (e.g., malformed JSON),
      // log the error and clear out the corrupted data to prevent future crashes.
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('location');
    } finally {
      // Ensure loading is set to false after attempting to sync state.
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });

      const { token, location } = response.data;
      const userData = { username }; 

      localStorage.setItem('token', token);
      localStorage.setItem('location', location);
      localStorage.setItem('user', JSON.stringify(userData)); // Always stringify the user object

      setToken(token);
      setLocation(location);
      setUser(userData);

    } catch (err) {
      setError('Invalid username or password');
      logout(); // Ensure everything is cleared on a failed login
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username: name,
        email,
        password,
      });

      const { token, location } = response.data; 
      const userData = { username: name, email };

      localStorage.setItem('token', token);
      localStorage.setItem('location', location);
      localStorage.setItem('user', JSON.stringify(userData)); // Always stringify the user object

      setToken(token);
      setLocation(location);
      setUser(userData);

    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setLocation(null);
    
    // Clear all related items from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      location,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      loading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};