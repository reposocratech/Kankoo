import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./../../users/UserMenu.scss";
import { NoContent } from "../../../components/NoContent/NoContent";

export const TopTours = () => {
  const [topTours, setTopTours] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/tours/toptours")
      .then((res) => {
        setTopTours(res.data.topResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <button className="UserMenuButton" onClick={() => navigate("/")}>
        Volver
      </button>
      <Row className="UserMenuTitle d-flex justify-content-center ">
        <h1>Las guías turísticas mejor valoradas</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        {topTours?.length != 0 ? (
          <>
            {topTours?.map((elem) => {
              return <CardOneTour elem={elem} />;
            })}
          </>
        ) : (
          <NoContent />
        )}
      </Row>
    </Container>
  );
};
