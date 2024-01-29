import { createBrowserRouter } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

export const router = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
]);

export default router;
