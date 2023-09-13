import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Login from './pages/Login';

import List from './pages/List';
import About from './pages/About';
import HomeAdmin from './pages/HomeAdmin';
import UserManagement from './pages/UserManagement';
import withProtection from './context/withProtection';
import NotFound from './pages/NotFound';
import ListFormsAdmin from './pages/ListFormsAdmin';

function App() {

  const ProtectedList = withProtection(List);
  const ProtectedHomeAdmin = withProtection(HomeAdmin);
  const ProtectedUserManagement = withProtection(UserManagement);
  const ProtectedListFormsAdmin = withProtection(ListFormsAdmin)

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (accesibles sin inicio de sesión) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />

        {/* Rutas protegidas (requieren inicio de sesión) */}
        <Route path="/listforms" element={<ProtectedList />} />
        <Route path="/homeadmin" element={<ProtectedHomeAdmin />} />
        <Route path="/userlist" element={<ProtectedUserManagement />} />
        <Route path="/listformsadmin" element={<ProtectedListFormsAdmin />} />

        {/* Ruta para manejar URLs no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
