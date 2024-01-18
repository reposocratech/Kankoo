import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export const UserProfile = () => {
  return (
    <>
      <h1>¡Bienvenido/a!</h1>
      <Row>
        <Col>
          <p>Mis guías</p>
        </Col>
        <Col>
          <p>Guías favoritas</p>
        </Col>
        <Col>
          <p>Guías adquiridas</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Editar perfil</p>
        </Col>
        <Col>
          <p>Crear nueva guía</p>
        </Col>
      </Row>
    </>
  );
};
