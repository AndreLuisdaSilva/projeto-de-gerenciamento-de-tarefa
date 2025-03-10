import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if(!isAuthenticated){
    return <Navigate to="/" state={{from: location}} replace />
  }
  
  return <Outlet />;
}
