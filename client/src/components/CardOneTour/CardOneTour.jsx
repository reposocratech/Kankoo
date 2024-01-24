import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CardOneTour.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
export const CardOneTour = ({ elem }) => {
  //showEdit(boton editar) se muestra si existe el ususario y su id coincide con el user_id del tour

  const navigate = useNavigate();
  /* console.log(elem); */
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
      </Row>
    </Row>
  );
};
