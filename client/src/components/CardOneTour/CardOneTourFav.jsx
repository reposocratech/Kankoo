import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./CardOneTour.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
export const CardOneTourFav = ({ tour }) => {
  //showEdit(boton editar) se muestra si existe el ususario y su id coincide con el user_id del tour
  const navigate = useNavigate();
  return (
    <Row className="CardOneTour d-flex flex-column align-items-center p-3">
      <img
        onClick={() => navigate(`/tours/onetour/${tour?.tour_id}`)}
        className="CarOneTourCover"
        variant="top"
        src={`http://localhost:3000/images/tours/${tour?.cover}`}
      />
      <Col className="CardOneTourInfo">
        <h2>{tour?.tour_name}</h2>
        <h3>{tour?.tour_city}</h3>
      </Col>
      <Row>
        {/*   <Col className="CardOneTourLike d-flex justify-content-center align-items-center">
          <img src="/icons/like.png" alt="icono de corazón" />
        </Col> */}
      </Row>
    </Row>
  );
};
