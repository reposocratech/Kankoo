import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTourFav } from "../../../components/CardOneTour/CardOneTourFav";
import { Container, Row } from "react-bootstrap";
import "./../UserMenu.scss";
import { useNavigate } from "react-router-dom";
export const Favorites = () => {
  const [favTours, setFavTours] = useState([]);
  const { user } = useContext(KankooContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user?.user_id}/favtoursgallery`)
      .then((res) => {
        setFavTours(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.user_id]);
  return (
    <Container>
      <button
        className="UserMenuButton"
        onClick={() => navigate("/users/userprofile")}
      >
        {" "}
        Volver
      </button>
      <Row className="UserMenuTitle d-flex justify-content-center ">
        <h1>Mis guías turísticas favoritas</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        {favTours?.map((tour) => {
          return <CardOneTourFav key={tour.tour_id} tour={tour} />;
        })}
      </Row>
    </Container>
  );
};
