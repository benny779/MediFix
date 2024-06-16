import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './features/authentication';

const PrivateRoutes = () => {
  const { isTokenActive } = useAuth();
  const location = useLocation();

  return isTokenActive ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoutes;
