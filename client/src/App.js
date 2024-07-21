import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceCalls from './pages/user/ServiceCalls';
import ServiceCallsManager from './pages/user/ServiceCallsManager'
import { CreateServiceCallForm } from './features/user/serviceCalls';
import PrivateRoutes from './PrivateRoutes';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Navigate to='/serviceCalls' replace />} />
          <Route path='/manager/serviceCalls' element = {<ServiceCallsManager/>}exact/>
          <Route path='/serviceCalls'>
            <Route index element={<ServiceCalls />} exact />
            <Route path='new' element={<CreateServiceCallForm />} exact />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<h1>Missing</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
