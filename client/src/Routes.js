import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCalls from './pages/user/ServiceCalls';
import { CreateServiceCallForm } from './features/user/serviceCalls';

export const router = createBrowserRouter([
  { path: '/', element: <ServiceCalls /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/createServiceCall', element: <CreateServiceCallForm /> },

]);

export default router;
