import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import { Navigate } from 'react-router-dom';
import PageContainer from './layouts/PageContainer';
import { CreateServiceCallForm, ServiceCalls, ServiceCallsManager } from './features/serviceCalls';
import { Login, Register } from './features/authentication';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<PageContainer />}>
            <Route path='/' element={<Navigate to='/serviceCalls' replace />} />
            <Route path='/manager/serviceCalls' element={<ServiceCallsManager />} exact />
            <Route path='/serviceCalls'>
              <Route index element={<ServiceCalls />} exact />
              <Route path='new' element={<CreateServiceCallForm />} exact />
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<h1>Missing</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
