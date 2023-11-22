// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('employeeInfo'); // Check if the user is authenticated (you may use a better method for this)
  
  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" /> // Redirect to the login page if not authenticated
  );
};

export default ProtectedRoute;
