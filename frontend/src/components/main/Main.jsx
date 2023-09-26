import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Service = ({ title, description, color }) => (
  <Col md={4} className={`service text-${color}`}>
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </Col>
);

const Main = () => {
  const services = [
    {
      title: "Seguridad de Datos",
      description:
        "Protegemos tus datos más valiosos contra amenazas cibernéticas, empleando las últimas tecnologías y estrategias de seguridad.",
      color: "primary",
    },
    {
      title: "Monitoreo Continuo",
      description:
        "Nuestro equipo de expertos vigila constantemente tu red para detectar y prevenir actividades sospechosas, garantizando la integridad de tu sistema.",
      color: "success",
    },
    {
      title: "Evaluación de Vulnerabilidades",
      description:
        "Identificamos y solucionamos debilidades en tu infraestructura de TI para que puedas estar un paso adelante de posibles amenazas.",
      color: "warning",
    },
  ];

  return (
    <>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center p-4"
      >
{/*         <img
          src="/assets/mainfoto.png"
          alt="Logo de CyberGuard"
          className="d-inline-block align-top"
          style={{ width: "80%", height: "400px" }}
        /> */}

        <header className="text-center mb-4">
          <h1 className="display-4">Bienvenido a CyberGuard</h1>
          <p className="lead">Tu socio en ciberseguridad</p>
        </header>

        <section className="services text-center my-4">
          <h2>Nuestros Servicios</h2>
          <Row>
            {services.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </Row>
        </section>

        <section className="cta text-center my-4">
          <h2>¿Listo para fortalecer tu seguridad en línea?</h2>
          <p>
            Únete a nosotros y protege tu empresa en el mundo digital.
            Contáctanos para obtener una consulta gratuita.
          </p>
          <a href="/form" className="nav-link" style={{ marginTop: "40px" }}>
            <Button className="cta-button btn-danger">Contáctanos</Button>
          </a>
        </section>
      </Container>
    </>
  );
};

export default Main;
