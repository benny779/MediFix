import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { tokenExistsAndNotExpired } from './features/authentication';

const PrivateRoutes = () => {
  const auth = { token: tokenExistsAndNotExpired() };
  const location = useLocation();

  return auth.token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoutes;
