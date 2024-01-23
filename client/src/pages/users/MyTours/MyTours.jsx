import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { getLocalStorage } from "../../../../helpers/localStorageUtils";
import { KankooContext } from "../../../context/KankooContext";
import axios from "axios";
import "./MyTours.scss";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";

export const MyTours = () => {
  const { setAllTours, user, token, setToken } = useContext(KankooContext);
  const [myTours, setMyTours] = useState();
  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      const { id } = jwtDecode(tokenLocalStorage).user;
      axios
        .get(`http://localhost:3000/users/mytours/${id}`)
        .then((res) => {
          setMyTours(res.data.resultMyTours);
          console.log(res.data.resultMyTours);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <Container>
      <Col>
        <Row>
          <div className="BackCombo" onClick={() => navigate(-1)}>
            <img
              className="BackArrow"
              src="/icons/back.png"
              alt="flecha a la izquierda"
            />
            <button className="backButton" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </Row>
      </Col>
      <Col>
        <Row>
          <div className="d-flex myToursHeader">
            <img
              className="myToursIcono"
              src="/icons/guiassubidas.png"
              alt="icono de ruta entre destinos"
            />
            <h2>Mis guías subidas</h2>
          </div>
        </Row>
        <Row
          className="d-flex justify-content-around align-items-center flex-wrap"
          md={4}
        >
          {myTours?.map((elem) => {
            return <CardOneTour key={elem.tour_id} elem={elem} />;
          })}
        </Row>
      </Col>
    </Container>
  );
};
