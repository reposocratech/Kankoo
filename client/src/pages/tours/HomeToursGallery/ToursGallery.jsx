import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, Container, Col, Row } from "react-bootstrap";
import "./ToursGallery.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
import { textSensitive } from "../../../../helpers/utils";
import { NoContent } from "../../../components/NoContent/NoContent";
export const ToursGallery = () => {
  const { allTours } = useContext(KankooContext);
  const [showAllTours, setShowAllTours] = useState(true);
  const [foundTours, setFoundTours] = useState();
  const [filter, setFilter] = useState("");

  const onChange = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);

    if (inputValue === "") {
      setShowAllTours(true);
      setFoundTours(null);
    } else {
      const tempArray = allTours.filter((elem) => {
        return (
          textSensitive(elem.tour_name, inputValue) ||
          textSensitive(elem.tour_description, inputValue) ||
          textSensitive(elem.tour_city, inputValue)
        );
      });
      setShowAllTours(false);
      setFoundTours(tempArray);
    }
  };

  return (
    <Container fluid>
      <Row className="s-flex justify-content-center">
        <Col className="d-flex justify-content-center" md={8}>
          <div className="HomeWelcome">
            <p className="HomeText">
              Te damos la bienvenida a KanKoo, la mejor app para tener
              experiencias de viaje sin restricciones con nuestras guías
              turísticas digitales. Accede al contenido que sube nuestra
              comunidad de viajeros/as y disfruta de imágenes espectaculares,
              vídeos y audio-guías directamente desde tu smartphone.📍
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Form className="gallerySearchbar d-flex mx-auto">
          <FormControl
            type="search"
            placeholder="🔍 ¿Qué te apetece visitar?"
            className="mr-2"
            aria-label="Buscar"
            onChange={onChange}
            value={filter}
          />
        </Form>
      </Row>

      <Row
        className="d-flex justify-content-around align-items-center flex-wrap p-3"
        md={4}
      >
        {showAllTours && allTours?.length !== 0 ? (
          <>
            {allTours?.map((elem) => (
              <CardOneTour key={elem.tour_id} elem={elem} />
            ))}
          </>

        ) : foundTours && foundTours.length !== 0 ? (

          foundTours.map((elem) => (
            <CardOneTour key={elem.tour_id} elem={elem} />
          ))
        ) : (
          <NoContent />
        )}
      </Row>
    </Container>
  );
};
