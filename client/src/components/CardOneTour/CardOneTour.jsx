import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    <Card
      style={{ width: "23rem", height: "30rem" }}
      className="CardOneTour d-flex flex-column p-4"
    >
      <img
        onClick={() => navigate(`/tours/onetour/${elem.tour_id}`)}
        className="CardOneTourCover"
        variant="top"
        src={`http://localhost:3000/images/tours/${elem.cover}`}
      />
      <h2>{elem.tour_name}</h2>
      <div className="CardOneTourInfo d-flex justify-content-between">
        <h3>{elem.tour_city}</h3>
        <div className="CardOneTourStar d-flex align-items-center justify-content-center">
          {averageRating
            ? typeof averageRating === "string"
              ? parseFloat(averageRating).toFixed(1)
              : "0"
            : "Sé el primero en valorar 😉"}
          {averageRating && <p>&#9733;</p>}
        </div>
      </div>
    </Card>
  );
};
