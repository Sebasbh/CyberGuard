import React from 'react';
import { FaUserLock } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={{ minHeight: '86px' }}>
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Navbar.Brand href="/" className="brand-logo" >
            <img style={{marginRight:'10px'}}
              src="/assets/Logo.png"
              alt="Logo de CyberGuard"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span className="brand-name">CyberGuard</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/about" className="nav-link">
              Sobre Nosotros
            </Nav.Link>
          </Nav>
        </div>
        <Nav>
          <a href="/login" className="login-button nav-link">
            <FaUserLock /> Registrarse
          </a>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
