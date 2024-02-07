import React, { useState, useEffect } from "react";
import { CreateTour } from "./CreateTour";
import { CreateSection } from "./CreateSection";
import "./CreateTour.scss";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendMail } from "../../../../helpers/sendmail";
export const FatherCreateTour = () => {
  const [showSections, setShowSections] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [resetSections, setResetSections] = useState(false);
  const [tour, setTour] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tour.tour_id) {
      axios
        .get(`http://localhost:3000/tours/onetour/${tour.tour_id}`)
        .then((res) => {
          setSections(res.data.resultOneTour);
        })
        .catch((err) => {
          console.log("Error en la solicitud Axios:", err);
        });
    }
  }, [resetSections, tour]);

  const getValidation = () => {
    if (sections.length === 0) {
      setMsg("¡Añade, al menos, un punto a tu guía!");
    } else {
      let url = "http://localhost:3000/tours/waiting";
      let msg = "Alguien ha subido una nueva guía, ¡acéptala!";
      let email = "kankoo.app.validation@gmail.com";
      let asunto = "Nueva guía";
      sendMail(url, msg, email, asunto);
      navigate("/tours/waiting");
    }
  };

  return (
    <>
      {!showSections && (
        <CreateTour
          setShowSections={setShowSections}
          tour={tour}
          setTour={setTour}
        />
      )}

      {showSections && (
        <>
          <Row className="s-flex justify-content-center">
            <Col className="d-flex justify-content-center" md={8}>
              <div className="Creando d-flex flex-column text-center align-items-center">
                <img
                  className="CreandoImg"
                  src="/assets/barra-de-carga.png"
                  alt=""
                />
                <h5 className="h5Creando">
                  Estás creando una nueva guía sobre
                </h5>
                <h4 className="h4Creando">{tour?.tour_name}</h4>
                <p className="pCreando">
                  ¡Importante! Para que tu contenido pueda ser aprobado, es
                  obligatorio añadir, como mínimo, un punto a tu guía y, además,
                  dicho punto tendrá que contener imágenes y audio y/o vídeo
                </p>

                <Row>
                  <Col lg={6} md={6} xs={12}>
                    <div className="d-flex flex-column align-items-end align-items-lg-end align-items-md-end align-items-center mb-4">
                      {tour?.cover && (
                        <img
                          src={`http://localhost:3000/images/tours/${tour.cover}`}
                          alt="portada de la guia"
                          className="portadaCreando"
                        />
                      )}
                    </div>
                  </Col>
                  <Col lg={6} md={6} xs={12}>
                    <div className="d-flex flex-column align-items-start align-items-lg-start align-items-md-start align-items-center mb-4">
                      <p>Puntos añadidos a tu guía:</p>
                      {sections.map((elem) => {
                        return (
                          <div className="d-flex">
                            <img
                              className="iconPunto me-2"
                              src="/assets/lugar.png"
                              alt=""
                            />
                            <p className="mt-1">{elem.section_name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </Col>
                  <Row>
                    <div className="d-flex flex-column justify-content-center mb-4">
                      <div>
                        <button
                          className="createSectionButton mt-4"
                          onClick={() => setShowFormSection(true)}
                        >
                          Añadir punto
                        </button>
                      </div>
                      <div className="validationCheck">
                        <button
                          onClick={getValidation}
                          className="createSectionButton mt-4"
                        >
                          Solicitar aprobación
                        </button>
                        <p>{msg}</p>
                      </div>
                    </div>
                  </Row>
                </Row>
              </div>
            </Col>
          </Row>

          {showFormSection && (
            <CreateSection
              resetSections={resetSections}
              setResetSections={setResetSections}
              setShowFormSection={setShowFormSection}
              tour={tour}
              sections={sections}
              setSections={setSections}
            />
          )}
        </>
      )}
    </>
  );
};
