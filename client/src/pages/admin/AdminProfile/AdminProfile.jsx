import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../users/UserProfile/UserProfile.scss";
import { KankooContext } from "../../../context/KankooContext";

export const AdminProfile = () => {
  const { adminUsers } = useContext(KankooContext);
  const navigate = useNavigate();

  return (
    <Container className="perfilGeneral d-flex flex-column align-items-center">
      <Row>
        <Col className="perfilButton d-flex flex-column align-items-center">
          <div className="perfilCircle">
            <img
              onClick={() => navigate("/admin/adminUsers")}
              src="/icons/userIcon.png"
              alt="icono de usuario"
            />
          </div>
          <p>Listado de Usuarios</p>
        </Col>

        <Col className="perfilButton d-flex flex-column align-items-center">
          <div className="perfilCircle">
            <img
              onClick={() => navigate("/admin/adminTours")}
              src="/icons/iconUbi.png"
              alt="icono de ubicación"
            />
          </div>
          <p>Listado de Guías</p>
        </Col>

        <Col className="perfilButton d-flex flex-column align-items-center">
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
