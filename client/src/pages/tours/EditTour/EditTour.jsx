import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./EditTour.scss";
import { KankooContext } from "../../../context/KankooContext";

const initialEditValueTour = {
  tour_name: "",
  tour_description: "",
  tour_acces: "",
  location: "",
  tour_city: "",
};

export const EditTour = () => {
  const [editTour, setEditTour] = useState(initialEditValueTour);
  const [msgError, setMsgError] = useState("");
  const [editFile, setFile] = useState();
  const navigate = useNavigate();

  const { allTours, setAllTours } = useContext(KankooContext);

  useEffect(() => {
    if (allTours) {
      setEditTour(allTours);
    }
  }, [allTours]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTour({ ...editTour, [name]: value });

    console.log(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    newFormData.append("editTour", JSON.stringify(editTour));
    newFormData.append("file", file);

    axios
      .post("http://localhost:3000/tours/edittour", newFormData)
      .then((res) => {
        console.log(res);
        if (res.data.img) {
          setAllTours({ ...editTour, cover: res.data.img });
        } else {
          setAllTours(editTour);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log("touuuuur", allTours);
  console.log("editTOOOuORR", editTour);

  return (
    <Row className="createTourGeneral">
      <h2>Editar guía turística</h2>
      <Col sm={2} md={2} lg={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la guía"
              name="tour_name"
              value={editTour.tour_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripción de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción de la guía"
              name="tour_description"
              value={editTour.tour_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad"
              name="tour_city"
              value={editTour.tour_city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el link de la ubicación"
              name="location"
              value={editTour.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Accesibilidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Info acces"
              name="tour_acces"
              value={editTour.tour_acces}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>
          {msgError && <p> {msgError} </p>}
          <div>
            <button
              type="button"
              className="createTourButton"
              variant="primary me-2"
              onClick={handleSubmit}
            >
              Aceptar
            </button>

            <button
              type="button"
              className="createTourButton"
              variant="primary"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
