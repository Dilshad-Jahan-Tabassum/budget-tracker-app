import React, { createContext, useState, useContext, useEffect } from 'react';

import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});


  const login = (userData) => {
    // Perform your login logic here
    setUser(userData);
  };

  const logout = () => {
    
    
    setUser(null);
    
    console.log(user)
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};