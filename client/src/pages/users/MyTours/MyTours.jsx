import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { KankooContext } from "../../../context/KankooContext";
import "./../UserMenu.scss";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
import { useNavigate } from "react-router-dom";
import { NoProfileContent } from "../../../components/NoContent/NoProfileContent";

export const MyTours = () => {
  const { myTours } = useContext(KankooContext);
  const navigate = useNavigate();
  return (
    <Container>
      <button
        className="UserMenuButton"
        onClick={() => navigate("/users/userprofile")}
      >
        Volver
      </button>
      <Row className="UserMenuTitle d-flex justify-content-center ">
        <h1>Todas mis guías turísticas</h1>
      </Row>
      <Row className="d-flex justify-content-center">
        {myTours?.length != 0 ? (
          <>
            {myTours?.map((elem) => {
              return <CardOneTour key={elem.tour_id} elem={elem} />;
            })}
          </>
        ) : (
          <NoProfileContent />
        )}
      </Row>
    </Container>
  );
};
