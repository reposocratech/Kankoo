import React, { useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CreateTour.scss";
const initialValueTour = {
  tour_name: "",
  tour_description: "",
  tour_city: "",
  tour_location: "",
  tour_language: "",
  tour_price: "",
  cover_resource_text: "",
  section_name: "",
  section_description: "",
  travel_distance: "",
  text: "",
};

export const CreateTour = () => {
  const [addTour, setAddTour] = useState(initialValueTour);
  const [showPoint, setShowPoint] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [submitedSection, setSubmitedSection] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTour({ ...addTour, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addTour.tour_name ||
      !addTour.tour_description ||
      !addTour.tour_city ||
      !addTour.tour_location ||
      !addTour.tour_language ||
      !addTour.tour_price ||
      !addTour.cover_resource_text ||
      setSubmitedSection(false)
    ) {
      setMsgError("Rellena todos los campos");
    } else {
      axios
        .post("http://localhost:3000/tours/newtour", addTour)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setMsgError("Oops ocurrió un error");
        });
    }
  };
  const handleSubmitSection = (e) => {
    setSubmitedSection(true);
  };
  return (
    <Row className="createTourGeneral">
      <h2>Crear nueva guía turística</h2>
      <Col sm={2} md={2} lg={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la guía"
              name="tour_name"
              value={addTour.tour_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripción de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción de la guía"
              name="tour_description"
              value={addTour.tour_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad"
              name="tour_city"
              value={addTour.tour_city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el link de la ubicación"
              name="location"
              value={addTour.tour_login}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Idioma de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce las siglas del idioma"
              name="tour_language"
              value={addTour.tour_language}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el precio de la guía"
              name="tour_price"
              value={addTour.tour_price}
              onChange={handleChange}
            />
          </Form.Group>
          <p>{msgError}</p>
          <div>
            <button
              type="button"
              className="createTourButton"
              onClick={() => setShowPoint(true)}
            >
              Añadir un punto en tu guía
            </button>
          </div>
          <div>
            <button
              className="createTourButton"
              variant="primary me-2"
              onClick={handleSubmit}
            >
              Solicitar aprobación
            </button>
            <button
              className="createTourButton"
              variant="primary"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Col>
      {showPoint && (
        <Col sm={2} md={2} lg={4} className="createTourSide">
          <h2>Añadir un punto a la guía turística</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre del punto de la guía</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
                name="section_name"
                value={addTour.section_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción del punto de la guía</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la guía"
                name="section_description"
                value={addTour.section_description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Distancia de recorrido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Distancia de recorrido"
                name="travel_distance"
                value={addTour.travel_distance}
                onChange={handleChange}
              />
            </Form.Group>
            <p>{msgError}</p>
            <button
              className="createTourButton"
              variant="primary me-2"
              onClick={handleSubmitSection}
            >
              Añadir
            </button>
            <button
              type="button"
              className="createTourButton"
              variant="primary"
              onClick={() => setShowPoint(false)}
            >
              Cancelar
            </button>
          </Form>
        </Col>
      )}
    </Row>
  );
};
