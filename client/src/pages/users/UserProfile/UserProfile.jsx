import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserProfile.scss";
import { KankooContext } from "../../../context/KankooContext";

export const UserProfile = () => {
  const [showCreateTour, setShowCreateTour] = useState(false);
  const { user } = useContext(KankooContext);
  const navigate = useNavigate();
  return (
    <Container className="UserPerfilGeneral d-flex flex-column align-items-center">
      <h1>¡Bienvenido/a! {user?.first_name}</h1>
      <Row>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div className="UserPerfilCircle">
            <img
              onClick={() => navigate("/users/mytours")}
              className="UserPerfilIcono"
              src="/icons/guiassubidas.png"
              alt="icono de ruta entre destinos"
            />
          </div>
          <p>Mis guías</p>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div className="UserPerfilCircle">
            <img
              onClick={() => navigate("/users/favtours")}
              className="UserPerfilIcono"
              src="/icons/favoritas.png"
              alt="icono de corazón"
            />
          </div>
          <p>Guías favoritas</p>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div className="UserPerfilCircle">
            <img
              onClick={() => navigate("/users/boughttours")}
              className="UserPerfilIcono"
              src="/icons/adquiridas.png"
              alt="icono de carrito de compra"
            />
          </div>
          <p>Guías adquiridas</p>
        </Col>
      </Row>
      <Row>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div className="UserPerfilCircle">
            <img
              onClick={() => navigate("/users/edituser")}
              className="UserPerfilIcono"
              src="/icons/editar.png"
              alt="icono con un lapiz y papel"
            />
          </div>
          <p>Editar perfil</p>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div className="UserPerfilCircle">
            <img
              onClick={() => navigate("/tours/newtour")}
              className="UserPerfilIcono"
              src="/icons/nuevaguia.png"
              alt="icono de un mapa"
            />
          </div>
          <p>Crear nueva guía</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Revisa nuestros
            <a href="/users/terms">Términos y condiciones de uso</a>
            ,así como nuestra
            <a href="/users/privacy">Política de privacidad</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
