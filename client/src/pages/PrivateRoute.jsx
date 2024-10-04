import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null for loading state

  useEffect(() => {
    axios.get('/api/check-auth', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(response.data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false); // In case of error, assume not authenticated
      });
  }, []);

  if (isAuthenticated === null) {
    // Return a loading state while checking authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
