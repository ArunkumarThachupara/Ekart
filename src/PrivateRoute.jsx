import React, { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Make an API request to the check_authentication view
    fetch('http://localhost:8000/api/customer/check_authentication/', {
      method: 'GET',
      credentials: 'include', // Include credentials to send cookies for authentication
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // Loading state, you can render a loading spinner here
    return null;
  }

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
