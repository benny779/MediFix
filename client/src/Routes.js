import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCalls from './pages/user/ServiceCalls';

export const router = createBrowserRouter([
  { path: '/', element: <ServiceCalls /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

export default router;
