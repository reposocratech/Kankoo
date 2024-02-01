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
    <Container
      fluid
      className="UserPerfilGeneral d-flex flex-column align-items-center"
    >
      <Row>
        <Col className="UserCard d-flex align-items-center flex-column pb-3">
          <h3>¡Hola! Estás en tu perfil</h3>
          <h5 className="h5perfil">
            {user?.first_name} {user?.last_name}, <span>{user?.email}</span>
          </h5>
        </Col>
      </Row>
      <Row>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div
            className="UserPerfilCard"
            onClick={() => navigate("/users/edituser")}
          >
            <img
              className="UserPerfilIcono"
              src="/icons/editar.png"
              alt="icono con un lapiz y papel"
            />
            <h5 className="h5Profile mt-3">Editar mi perfil</h5>
            <p className="pParrafo">
              Personaliza y mantén siempre actualizada tu información.
            </p>
          </div>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div
            className="UserPerfilCard "
            onClick={() => navigate("/users/favtours")}
          >
            <img
              className="UserPerfilIcono"
              src="/icons/favoritas.png"
              alt="icono de corazón"
            />
            <h5 className="h5Profile mt-3">Mis guías favoritas</h5>

            <p className="pParrafo">
              Aquí todas las guías a las que les has dado like.
            </p>
          </div>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div
            className="UserPerfilCard "
            onClick={() => navigate("/users/boughttours")}
          >
            <img
              className="UserPerfilIcono"
              src="/icons/adquiridas.png"
              alt="icono de carrito de compra"
            />
            <h5 className="h5Profile mt-3">Mis guías adquiridas</h5>
            <p className="pParrafo">
              Aquí encontrarás todas las guías que has adquirido.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div
            className="UserPerfilCard2"
            onClick={() => navigate("/tours/newtour")}
          >
            <img
              className="UserPerfilIcono"
              src="/icons/nuevaguia.png"
              alt="icono de un mapa"
            />
            <h5 className="h5Profile mt-3">Crear nueva guía</h5>
            <p className="pParrafo">
              Conviértete en guía y comparte tus lugares favoritos. Esta acción
              requiere aprobación.
            </p>
          </div>
        </Col>
        <Col className="UserPerfilButton d-flex flex-column align-items-center">
          <div
            className="UserPerfilCard2"
            onClick={() => navigate("/users/mytours")}
          >
            <img
              className="UserPerfilIcono"
              src="/icons/guiassubidas.png"
              alt="icono de ruta entre destinos"
            />
            <h5 className="h5Profile mt-3">Mis guías creadas</h5>
            <p className="pParrafo">
              Explora y edita tu contenido para ofrecer experiencias únicas a
              los/as viajeros/as.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
