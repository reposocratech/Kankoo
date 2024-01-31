import React from "react";
import { Row, Col } from "react-bootstrap";
import "./WaitingValidation.scss";
import { useNavigate } from "react-router-dom";

export const WaitingValidation = () => {
  const navigate = useNavigate();
  return (
    <Row md={3} className="d-flex justify-content-center m-0">
      <Col className="waitingFrame d-flex flex-column justify-content-center align-items-center">
        <img
          src="/icons/clock.png"
          alt="icono de reloj"
          className="waitingIcon"
        />
        <h2>¡Gracias por el contenido!</h2>
        <p>Tu solicitud está a la espera de validación por el administrador.</p>
        <button
          className="waitingVolver"
          onClick={() => navigate("/users/userprofile")}
        >
          Vuelve a tu perfil
        </button>
      </Col>
    </Row>
  );
};
