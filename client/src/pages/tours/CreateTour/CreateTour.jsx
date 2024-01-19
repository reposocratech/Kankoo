import React, { useContext, useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CreateTour.scss";
import { KankooContext } from "../../../context/KankooContext";

const initialValueTour = {
  tour_name: "",
  tour_description: "",
  tour_acces: "",
  location: "",
  tour_city: "",
  cover: "",
  price: "",
};

export const CreateTour = ({ setShowCreateTour, user_id }) => {
  const [addTour, setAddTour] = useState(initialValueTour);
  const [showPoint, setShowPoint] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [submitedSection, setSubmitedSection] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const { setTours } = useContext(KankooContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTour({ ...addTour, [name]: value });
    console.log(e.target.value);
  };

  // const handleFile = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleSubmit = () => {
    if (
      !addTour.tour_name ||
      !addTour.tour_description ||
      !addTour.tour_city ||
      !addTour.location
    ) {
      setMsgError("Rellena todos los campos");
    } else {
      let temp = { ...addTour, user_id };
      const { tour_name, tour_description, tour_city, location, user_id } =
        temp;

      console.log("Datos a enviar:", temp);
      const newFormData = new FormData();

      newFormData.append("regTour", JSON.stringify(temp));
      // newFormData.append("file", file);

      axios
        .post("http://localhost:3000/tours/newtour", newFormData)
        .then((res) => {
          setTours(res.data);
          setShowCreateTour(false);
          console.log("Respuesta del servidor:", res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setMsgError("Oops ocurrió un error");
        });
    }
  };
  console.log(addTour);

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
              value={addTour.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Accesibilidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Info acces"
              name="tour_acces"
              value={addTour.tour_acces}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el precio de la guía"
              name="tour_price"
              value={addTour.tour_price}
              onChange={handleChange}
            />
          </Form.Group> */}
          {/* <Form.Group controlId="formFileLg" className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group> */}
          <p>{msgError}</p>
          {/* <div>
            <button
              type="button"
              className="createTourButton"
              onClick={() => setShowPoint(true)}
            >
              Añadir un punto en tu guía
            </button>
          </div> */}
          <div>
            <button
              type="button"
              className="createTourButton"
              variant="primary me-2"
              onClick={handleSubmit}
            >
              Solicitar aprobación
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
      {/* {showPoint && (
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
      )} */}
    </Row>
  );
};
