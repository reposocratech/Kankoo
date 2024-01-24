import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CardOneTour.scss";
import { useNavigate } from "react-router-dom";
export const CardOneTour = ({ elem }) => {
  const navigate = useNavigate();
  console.log(elem);
  return (
    <Row className="CardOneTour d-flex flex-column align-items-center">
      <img
        onClick={() => navigate(`/tours/onetour/${elem.tour_id}`)}
        className="CarOneTourCover"
        variant="top"
        src={`http://localhost:3000/images/tours/${elem.cover}`}
      />
      <Row>
        <Col className="CardOneTourInfo">
          <h2>{elem.tour_name}</h2>
          <h3>{elem.tour_city}</h3>
        </Col>
        <Col className="CardOneTourLike d-flex justify-content-center align-items-center">
          <img src="/icons/like.png" alt="icono de corazón" />
        </Col>
        <button
          onClick={() => navigate("/tours/edittour")}
          className="CardOneTourBoton"
        >
          Editar
        </button>
      </Row>
    </Row>
  );
};
