import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';

function HeaderUser() {
  // Función para manejar el cierre de sesión
  function handleLogout() {
    // Eliminar el token de localStorage o de donde lo tengas almacenado
    localStorage.removeItem('token'); // Reemplaza 'token' con el nombre de tu token
    // Otras acciones de cierre de sesión, como redirección a la página de inicio de sesión, etc.
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={{ minHeight: '85px' }}>
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Navbar.Brand className="brand-logo" >
            <img style={{ marginRight: '10px' }}
              src="/assets/Logo.png"
              alt="Logo de CyberGuard"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span className="brand-name">CyberGuard</span>
          </Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </div>
        <Nav>
          {/* Botón de cierre de sesión con el manejador de eventos */}
          <a href="/" className="login-button nav-link" onClick={handleLogout}>
            <FaUserLock /> Logout
          </a>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HeaderUser;
