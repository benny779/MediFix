import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCalls from './pages/user/ServiceCalls';
import { CreateServiceCallForm } from './features/user/serviceCalls';
import { tokenExistsAndNotExpired } from './features/authentication';

console.log(tokenExistsAndNotExpired());

export const router = createBrowserRouter([

  { path: '/', element: tokenExistsAndNotExpired() ? <ServiceCalls /> : <Login /> },
  { path: '/ServiceCalls', element: tokenExistsAndNotExpired() ? <ServiceCalls /> : <Login /> },
  { path: '/login', element: tokenExistsAndNotExpired() ? <ServiceCalls /> : <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/createServiceCall', element: tokenExistsAndNotExpired() ? <CreateServiceCallForm /> : <Login /> },

]);

export default router;
