import { createBrowserRouter } from 'react-router-dom';
import LoginForm from './features/auth/pages/LoginForm';
import RegisterForm from './features/auth/pages/RegisterForm';

export const router = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
]);

export default router;
