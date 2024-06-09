import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCalls from './pages/user/ServiceCalls';
import { CreateServiceCallForm } from './features/user/serviceCalls';
import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ServiceCalls />} path="/" exact />
            <Route element={<CreateServiceCallForm />} path="/createServiceCall" exact />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
