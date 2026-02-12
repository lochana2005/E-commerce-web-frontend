import React, { createContext, useState, useEffect } from 'react';

// මුළු App එක පුරාම Auth තොරතුරු බෙදාගැනීමට Context එක නිර්මාණය කිරීම
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // සයිට් එක පූරණය වෙද්දීම LocalStorage එක පරීක්ෂා කර යූසර් ඉන්නවාදැයි බලයි
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    // Token එක සහ User දත්ත දෙකම තිබේ නම් පමණක් JSON එක පණගන්වයි
    return savedUser && token ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // සයිට් එක Load වෙද්දී දත්ත වල ආරක්ෂාව තහවුරු කිරීමට
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && !user && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  // Login වීමේදී Token එක සහ User දත්ත (නම, පින්තූරය ඇතුළුව) සේව් කරයි
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Object එක String එකක් ලෙස සේව් කිරීම
  };

  // Logout වීමේදී LocalStorage එක සම්පූර්ණයෙන්ම පිරිසිදු කරයි
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};