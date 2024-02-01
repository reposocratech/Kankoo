import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.scss";

export const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="perfilGeneral d-flex flex-column align-items-center"
    >
      <Row>
        <Col
          xs={12}
          md={4}
          className="perfilButton d-flex flex-column align-items-center"
        >
          <div className="perfilCircle">
            <img
              onClick={() => navigate("/admin/adminUsers")}
              src="/icons/userIcon.png"
              alt="icono de usuario"
            />
          </div>
          <p className="pAdmin">Listado de Usuarios</p>
        </Col>

        <Col
          xs={12}
          md={4}
          className="perfilButton d-flex flex-column align-items-center"
        >
          <div className="perfilCircle">
            <img
              onClick={() => navigate("/admin/adminTours")}
              src="/icons/iconUbi.png"
              alt="icono de ubicación"
            />
          </div>
          <p>Listado de Guías</p>
        </Col>

        <Col
          xs={12}
          md={4}
          className="perfilButton d-flex flex-column align-items-center"
        >
          <div className="perfilCircle">
            <img
              onClick={() => navigate("/admin/adminStats")}
              src="/icons/stats.png"
              alt="icono de grafico"
            />
          </div>
          <p>Estadísticas</p>
        </Col>
      </Row>
    </Container>
  );
};
