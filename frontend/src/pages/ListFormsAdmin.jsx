import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import HeaderUser from '../components/header/HeaderUser.jsx';
import FooterUser from '../components/footer/FooterUser.jsx';
import { setAuthToken, getFormList, updateForm, deleteForm } from '../context/Api.js'; 
import Navbar from '../components/header/Navbar.jsx';

function ListFormsAdmin() {
  const [formList, setFormList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingForm, setEditingForm] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    const tokenFromlocalStorage = localStorage.getItem('token');
    setAuthToken(tokenFromlocalStorage);
    async function fetchFormList() {
      try {
        const response = await getFormList();

        setFormList(response);
        setLoading(false);
      } catch (error) {
        setError("Error fetching forms.");
        setLoading(false);
      }
    }

    fetchFormList();
  }, []);



  const handleUpdateForm = async (formId) => {
    if (editingForm === formId) {
      try {
        await updateForm(formId, editedValues);
        setEditingForm(null);
        setEditedValues({});
      } catch (error) {
        setError("Error updating the form.");
      }
    } else {
      setEditingForm(formId);
      const formToEdit = formList.find((form) => form._id === formId);
      setEditedValues({ ...formToEdit });
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      await deleteForm(formId);
      setFormList(formList.filter(form => form._id !== formId));
    } catch (error) {
    alert("Error deleting the form.");
    }
  };

  return (
    <>
      <HeaderUser />
      <Navbar/>
      <Container fluid className="my-5">
        <Row>
        <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4 mx-auto">
            <h1 className="mb-4">Lista de Formularios</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <Row>
                {formList.length > 0 ? (
                  formList.map((form) => (
                    <Col key={form._id} lg={4} md={6} sm={12} className="mb-5">
                      <Card>
                        <Card.Body>
                          <Card.Title className="text-primary">{form.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Creado por: {form.createdBy}</Card.Subtitle>
                          <Card.Text>
                            <strong>Email: </strong>
                            {editingForm === form._id ? (
                              <input
                                type="text"
                                value={editedValues.email}
                                onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })}
                              />
                            ) : (
                              form.email
                            )}
                            <br />
                            <strong>Asunto: </strong>
                            {editingForm === form._id ? (
                              <input
                                type="text"
                                value={editedValues.subject}
                                onChange={(e) => setEditedValues({ ...editedValues, subject: e.target.value })}
                              />
                            ) : (
                              form.subject
                            )}
                            <br />
                            <strong>Mensaje: </strong>
                            {editingForm === form._id ? (
                              <input
                                type="text"
                                value={editedValues.message}
                                onChange={(e) => setEditedValues({ ...editedValues, message: e.target.value })}
                              />
                            ) : (
                              form.message
                            )}
                            <br />
                            <strong>Estado: </strong>
                            {editingForm === form._id ? (
                              <input
                                type="text"
                                value={editedValues.status}
                                onChange={(e) => setEditedValues({ ...editedValues, status: e.target.value })}
                              />
                            ) : (
                              form.status
                            )}
                            <br />
                          </Card.Text>
                          {editingForm === form._id ? (
                            <div>
                              <Button variant="primary" onClick={() => handleUpdateForm(form._id)}>Guardar</Button>
                              <Button variant="danger" onClick={() => setEditingForm(null)}>Cancelar</Button>
                            </div>
                          ) : (
                            <div>
                              <Button variant="primary" onClick={() => handleUpdateForm(form._id)}>Editar</Button>
                              <Button variant="danger" onClick={() => handleDeleteForm(form._id)}>Eliminar</Button>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No hay formularios disponibles.</p>
                )}
              </Row>
            )}
          </main>
        </Row>
      </Container>
      <FooterUser />
    </>
  );
}

export default ListFormsAdmin;
