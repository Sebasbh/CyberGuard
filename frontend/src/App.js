import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Login from './pages/Login';

import List from './pages/List';
import HomeAdmin from './pages/HomeAdmin';
import withProtection from './context/withProtection';
import Dashboard from './pages/Dashboard';
import ListFormsAdmin from './pages/ListFormsAdmin';

import NotFound from './pages/NotFound';
function App() {

  const ProtectedList = withProtection(List);
  const ProtectedHomeAdmin = withProtection(HomeAdmin);
  const ProtectedListFormsAdmin = withProtection(ListFormsAdmin)
  const ProtectedDashboard = withProtection(Dashboard)

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (accesibles sin inicio de sesión) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />

        {/* Rutas protegidas (requieren inicio de sesión) */}
        <Route path="/listforms" element={<ProtectedList />} />
        <Route path="/homeadmin" element={<ProtectedHomeAdmin />} />
        <Route path="/listformsadmin" element={<ProtectedListFormsAdmin />} />
        <Route path="/Dashboard" element={<ProtectedDashboard/>}/>

        {/* Ruta para manejar URLs no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
