import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HeaderUser from '../components/header/HeaderUser.jsx';
import FooterUser from '../components/footer/FooterUser.jsx';
import { setAuthToken, getFormList } from '../context/Api.js';

function List() {
  const [formList, setFormList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenFromlocalStorage = localStorage.getItem('token');
    console.log(tokenFromlocalStorage)
    setAuthToken(tokenFromlocalStorage);

    const fetchData = async () => {
      try {
        const data = await getFormList();
        setFormList(data);
        setError(null);
        console.log(data);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        setError('Hubo un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderUser />
      <Container className="my-5" style={{ minHeight: "75vh" }}>
        <h1 className="text-center mb-4">Lista de Formularios</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <Row>
          {formList.length > 0 ? (
            formList.map((form) => (
              <Col key={form._id} lg={4} md={6} sm={12} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-primary">{form.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Creado por: {form.createdBy}</Card.Subtitle>
                    <Card.Text>
                      <strong>Email: </strong> {form.email}<br />
                      <strong>Asunto: </strong> {form.subject}<br />
                      <strong>Mensaje: </strong> {form.message}<br />
                      <strong>Estado: </strong> {form.status}<br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No hay formularios disponibles.</p>
          )}
        </Row>
      </Container>
      <FooterUser />
    </>
  );
}

export default List;
