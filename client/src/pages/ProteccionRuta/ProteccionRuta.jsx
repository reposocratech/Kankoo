import React from "react";
import { Col, Row } from "react-bootstrap";
import "./../tours/WaitingValidation/WaitingValidation.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const ProteccionRuta = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Row md={3} className="d-flex justify-content-center m-0">
      <Col className="waitingFrame d-flex flex-column justify-content-center align-items-center">
        <img
          src="/icons/prohibicion.png"
          alt="icono de prohibido"
          className="stopIcon"
        />
        <h2>¿Aún no te has registrado?</h2>

        <p>
          ¡Entra{" "}
          <Link to={"/users/registeruser"} className="linkRegister">
            aquí
          </Link>{" "}
          para acceder sin límite a todo el contenido de Kankoo!
        </p>
        <button className="waitingVolver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </Col>
    </Row>
  );
};
