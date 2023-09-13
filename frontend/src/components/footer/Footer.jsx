import React from 'react';
import { Container,  } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-1">
      <Container>
        <div className="footer-content">
        </div>
        <div className="footer-info mt-4 text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} CyberGuard. Todos los derechos reservados.</p>
          <p className="mb-0">Dirección: Tu dirección, Ciudad, País</p>
          <p className="mb-0">Teléfono: +123 456 789</p>
          <p>Email: <a href="mailto:info@cyberguard.com" className="nav-link">info@cyberguard.com</a></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
