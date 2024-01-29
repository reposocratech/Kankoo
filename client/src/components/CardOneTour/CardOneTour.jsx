import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
import "./CardOneTour.scss";
import axios from "axios";
export const CardOneTour = ({ elem }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/avgrating/${elem.tour_id}`)
      .then((res) => {
        setAverageRating(res.data.averageRating);
      })
      .catch((err) => {
        console.error("Error al obtener la media de los ratings:", err);
      });
  }, [elem.tour_id, averageRating]);

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
        <Col>
          <div className="d-flex">
            {averageRating
              ? typeof averageRating === "string"
                ? parseFloat(averageRating).toFixed(1)
                : "0"
              : null}
            {averageRating && <p>&#9733;</p>}
          </div>
        </Col>
      </Row>
    </Row>
  );
};
