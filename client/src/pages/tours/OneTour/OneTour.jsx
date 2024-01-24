import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneTour.scss";
import { KankooContext } from "../../../context/KankooContext";
export const OneTour = () => {
  const [oneTour, setOneTour] = useState();
  const { tour_id } = useParams();
  const { user } = useContext(KankooContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/onetour/${tour_id}`)
      .then((res) => {
        setOneTour(res.data.resultOneTour);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [tour_id]);
  console.log("toooooooooooooooooooooour", oneTour);
  console.log(user);

  return (
    <>
      {oneTour && (
        <Container>
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
          <Row>
            <Col md={6}>
              <div className="OneTourInfo d-flex flex-column justify-content-center align-items-center">
                <h2>{oneTour[0]?.tour_name}</h2>
                <h3>{oneTour[0]?.tour_city}</h3>
                <img
                  src={`http://localhost:3000/images/tours/${oneTour[0]?.cover}`}
                  alt="imagen de la guía turísitca"
                  className="OneTourImg"
                />
                <h4>{oneTour[0]?.price}</h4>
              </div>
              <div className="OneTourUserInfo d-flex justify-content-start align-items-center">
                <img
                  onClick={() => navigate("/users/oneuser")}
                  className="OneTourProfilePicture"
                  src={`http://localhost:3000/images/users/${user?.avatar}`}
                  alt=""
                />
                <h5>
                  {user?.first_name} {user?.last_name}
                </h5>
              </div>
              <div className="OneTourInfo d-flex flex-column justify-content-center align-items-center">
                <p>{oneTour[0]?.tour_description}</p>
                <button className="OneTourButton">Adquirir</button>
              </div>
            </Col>
            <Col>
              <h3>Secciones de la ruta de {oneTour[0]?.tour_name}</h3>
              <div md={4} className="d-flex">
                {oneTour?.map((elem, key) => {
                  return (
                    <div
                      key={elem.section_id}
                      className="d-flex flex-column align-items-center"
                    >
                      <img
                        onClick={() =>
                          navigate(`/tours/onesection/${elem.section_id}`)
                        }
                        className="OneTourSectionImg"
                        src={`http://localhost:3000/images/section/${elem.text}`}
                        alt="portada de seccion"
                      />
                      <h5>{elem.section_name}</h5>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
