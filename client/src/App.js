import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
