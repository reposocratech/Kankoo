import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./UserProfile.scss";
export const UserProfile = () => {
  return (
    <Container className="perfilGeneral">
      <h1>¡Bienvenido/a!</h1>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <img
            className="perfilIcono"
            src="/icons/guiassubidas.png"
            alt="icono de ruta entre destinos"
          />
          <p>Mis guías</p>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <img
            className="perfilIcono"
            src="/icons/favoritas.png"
            alt="icono de corazón"
          />
          <p>Guías favoritas</p>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <img
            className="perfilIcono"
            src="/icons/adquiridas.png"
            alt="icono de carrito de compra"
          />
          <p>Guías adquiridas</p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <img
            className="perfilIcono"
            src="/icons/editar.png"
            alt="icono con un lapiz y papel"
          />
          <p>Editar perfil</p>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <img
            className="perfilIcono"
            src="/icons/nuevaguia.png"
            alt="icono de un mapa"
          />
          <p>Crear nueva guía</p>
        </Col>
      </Row>
    </Container>
  );
};
