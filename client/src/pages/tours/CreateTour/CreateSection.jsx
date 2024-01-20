import React from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const initialValueSection = {
  section_name: "",
  section_description: "",
  travel_distance: "",
};

export const CreateSection = () => {
  const [addSection, setAddSection] = useState(initialValueSection);
  const [images, setImages] = useState();
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTour({ ...addTour, [name]: value });
    console.log(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!addTour.section_name || !addTour.section_description) {
      setMsgError("Rellena todos los campos");
    }
  };

  return (
    <Row className="createTourGeneral">
      <h2>Crear un nuevo punto</h2>
      <Col sm={2} md={2} lg={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre de punto </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la punto"
              name="section_name"
              onChange={handleChange}
              value={addSection.section_name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripción </Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del punto"
              name="section_description"
              onChange={handleChange}
              value={addSection.section_description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Distancia </Form.Label>
            <Form.Control
              type="text"
              placeholder="Distancia del punto"
              name="travel_distance"
              onChange={handleChange}
              value={addSection.travel_distance}
            />
          </Form.Group>
          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          <Button onClick={handleSubmit}>Crear punto</Button>
          <Button>Cancelar</Button>
        </Form>
      </Col>
    </Row>
  );
};
