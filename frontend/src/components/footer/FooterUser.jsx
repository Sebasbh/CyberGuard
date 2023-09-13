import React from 'react';
import { Container } from 'react-bootstrap';

function FooterUser() {
  return (
    <footer className="footer bg-dark text-light py-3">
      <Container>
        <div className="footer-info mt-4 text-center">
          <p className="mb-0">CyberGuard</p>
        </div>
      </Container>
    </footer>
  );
}

export default FooterUser;
