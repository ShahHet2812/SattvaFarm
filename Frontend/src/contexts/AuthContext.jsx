import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'farmer' | 'admin' | 'provider'} role
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {(email: string, password: string) => Promise<void>} login
 * @property {(name: string, email: string, password: string) => Promise<void>} register
 * @property {() => void} logout
 * @property {boolean} loading
 * @property {string|null} error
 */

const AuthContext = React.createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// FIX: Remove TypeScript syntax from AuthProvider and state types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes only - in real app, this would come from the backend
      const mockUser = {
        id: '1',
        name: 'Demo Farmer',
        email,
        role: 'farmer'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes only
      const mockUser = {
        id: '1',
        name,
        email,
        role: 'farmer'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
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