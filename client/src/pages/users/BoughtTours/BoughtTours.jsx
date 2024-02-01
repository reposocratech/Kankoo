import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import axios from "axios";
import { CardOneTourFav } from "../../../components/CardOneTour/CardOneTourFav";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NoProfileContent } from "../../../components/NoContent/NoProfileContent";

export const BoughtTours = () => {
  const [acquiredTours, setAcquiredTours] = useState([]);
  const { user } = useContext(KankooContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user?.user_id}/boughttoursgallery`)
      .then((res) => {
        setAcquiredTours(res.data.result);
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
        Volver
      </button>
      <Row className="UserMenuTitle d-flex justify-content-center ">
        <h1>Mis guías turísticas adquiridas</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        {acquiredTours?.length != 0 ? (
          <>
            {acquiredTours?.map((tour) => {
              return <CardOneTourFav key={tour.tour_id} tour={tour} />;
            })}
          </>
        ) : (
          <NoProfileContent />
        )}
      </Row>
    </Container>
  );
};
