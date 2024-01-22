import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CardOneTour.scss";
export const CardOneTour = ({ elem }) => {
  return (
    <Row className="CardOneTour d-flex flex-column align-items-center">
      <img
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
      </Row>
    </Row>
  );
};
