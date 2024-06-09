import { Outlet, Navigate } from 'react-router-dom';
import { tokenExistsAndNotExpired } from './features/authentication';

const PrivateRoutes = () => {
  let auth = { token: false };

  if (tokenExistsAndNotExpired()) {
    auth.token = true;
  }
  console.log(auth.token);
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
