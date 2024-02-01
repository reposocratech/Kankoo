import React, { useContext, useEffect } from "react";
import "./CardOneSection.scss";
import { useNavigate } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const CardOneSection = ({
  elem,
  oneTour,
  user,
  resetOneTour,
  setResetOneTour,
}) => {
  const { setOneSection } = useContext(KankooContext);
  const navigate = useNavigate();
  useEffect(() => {
    setOneSection(elem);
  }, [elem]);
  const handleClickSection = () => {
    if (user) {
      navigate(`/tours/onesection/${elem?.tour_id}/${elem?.section_id}`);
    } else {
      navigate("/users/stop");
    }
  };
  const delSection = () => {
    axios
      .put(
        `http://localhost:3000/tours/delsection/${elem?.tour_id}/${elem?.section_id}`
      )
      .then((res) => {
        setResetOneTour(!resetOneTour);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="prueba">
      <Row>
        <Col>
          <div className="CardOneSection d-flex flex-column align-self-lg-start align-self-xs-center">
            <div>
              <img
                onClick={handleClickSection}
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
                    onClick={delSection}
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
                  Editar
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
