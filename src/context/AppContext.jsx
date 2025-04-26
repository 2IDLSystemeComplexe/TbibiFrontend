import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userData, setUserData] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  // Keep localStorage in sync
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  }, [userData]);

  const value = {
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;