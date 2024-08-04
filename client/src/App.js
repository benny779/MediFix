import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import { Navigate } from 'react-router-dom';
import PageContainer from './layouts/PageContainer';
import { CreateServiceCallForm, ServiceCalls, ServiceCallsManager, ServiceCall } from './features/serviceCalls';
import { Login, Register } from './features/authentication';
import { Users, User, Locations, Categories, Dashboard } from './features/manage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route element={<PageContainer />}>
            <Route path="/" element={<Navigate to="/serviceCalls" replace />} />
            <Route path="/manager/serviceCalls" element={<ServiceCallsManager />} exact />
            <Route path="/serviceCalls">
              <Route index element={<ServiceCalls />} exact />
              <Route path=":id" element={<ServiceCall />} exact />
              <Route path="new" element={<CreateServiceCallForm />} exact />
            </Route>

            <Route path="/manage">
              <Route path="users" element={<Users />} exact />
              <Route path="users/:id" element={<User />} exact />
              <Route path="locations" element={<Locations />} exact />
              <Route path="categories" element={<Categories />} exact />
            </Route>

            <Route path="dashboard" element={<Dashboard />} exact />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
