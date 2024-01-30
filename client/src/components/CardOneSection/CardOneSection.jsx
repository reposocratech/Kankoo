import React, { useContext, useEffect } from "react";
import "./CardOneSection.scss";
import { useNavigate, Link, useParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const CardOneSection = ({ elem, oneTour, user }) => {
  const { setOneSection } = useContext(KankooContext);
  useEffect(() => {
    setOneSection(elem);
  }, [elem]);
  const delSection = () => {
    axios
      .put(
        `http://localhost:3000/tours/delsection/${elem?.tour_id}/${elem?.section_id}`
      )
      .then((res) => {
        console.log("eliminacion", res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
  return (
    <Container className="prueba">
      <Row>
        <Col>
          <div className="CardOneSection d-flex flex-column align-self-lg-start">
            <div>
              <img
                onClick={() =>
                  navigate(
                    `/tours/onesection/${elem?.tour_id}/${elem?.section_id}`
                  )
                }
                className="TourSectionImg"
                src={`http://localhost:3000/resources/images/${elem?.section_cover}`}
                alt="portada de seccion"
              />
            </div>

            <div className="h5CardOneSection mt-3">
              <p>{elem.section_name}</p>
            </div>

            {oneTour[0]?.user_id === user?.user_id && (
              <div>
                {oneTour.length > 1 && (
                  <button
                    type="button"
                    className="CardOneSectionButton me-1"
                    onClick={() => delSection(elem.section_id)}
                  >
                    Eliminar
                  </button>
                )}

                <button
                  type="button"
                  className="CardOneSectionButton"
                  onClick={() =>
                    navigate(
                      `/tours/editsection/${elem?.tour_id}/${elem?.section_id}`
                    )
                  }
                >
                  Editar adfadfadfadfadfadfadfad
                </button>

                {oneTour[0]?.user_id === user?.user_id &&
                  oneTour.length === 1 && (
                    <div className="pInfo mt-3 d-flex align-items-center text-center">
                      <p className="mt-3">
                        ¡Atención! Si quieres borrar todas los puntos de tu
                        guía, deberás borrar la guía completa.
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
