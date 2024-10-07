import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  return token ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
