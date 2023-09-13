import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "" });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Panel de Control de Usuarios</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>Agregar Usuario</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit">Agregar Usuario</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Lista de Usuarios</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManagement;
