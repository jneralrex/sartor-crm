// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useToken } from './authStore';

const PrivateRoute = () => {
  const token  = useToken();

  // If there's no token, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
