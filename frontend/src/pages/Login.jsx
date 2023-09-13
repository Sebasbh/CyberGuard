import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from '../context/Api.js';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    hiddenField1: "",
    hiddenField2: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData, navigate, setError, setLoading);
  };
  
  return (
    <>
      <Header />
      <Container className="mt-5" style={{ minHeight: "70vh" }}>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card bg="dark" text="white" style={{ marginTop: "100px" }}>
              <Card.Body>
                <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Nombre de usuario:</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  </Form.Group>
                  <Form.Group style={{ marginTop: "20px" }}>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Ingresa tu contraseña"
                    />
                  </Form.Group>
                  {/* Campos ocultos */}
                  <Form.Group>
                    <Form.Control
                      type="hidden"
                      name="hiddenField1"
                      value={formData.hiddenField1}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="hidden"
                      name="hiddenField2"
                      value={formData.hiddenField2}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="btn-dark text-white mx-auto"
                    disabled={loading}
                    style={{ marginTop: "20px" }}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Login;
