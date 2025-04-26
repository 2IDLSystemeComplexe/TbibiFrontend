// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // or a 403 page
  }

  return element;
};

export default ProtectedRoute;
