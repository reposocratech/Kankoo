import React, { useContext, useState } from "react";
import { Col, Row, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateTour.scss";
import { KankooContext } from "../../../context/KankooContext";

const initialValueTour = {
  tour_name: "",
  tour_description: "",
  tour_acces: "",
  location: "",
  tour_city: "",
};

export const CreateTour = ({ setTour, setShowSections }) => {
  const [addTour, setAddTour] = useState(initialValueTour);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const { user } = useContext(KankooContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTour({ ...addTour, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !file ||
      !addTour.tour_name ||
      !addTour.tour_description ||
      !addTour.tour_city ||
      !addTour.location
    ) {
      setMsgError("Campo obligatorio");
    } else {
      const newFormData = new FormData();
      const temp = { ...addTour, user_id: user?.user_id };
      newFormData.append("addTour", JSON.stringify(temp));
      newFormData.append("file", file);

      axios
        .post("http://localhost:3000/tours/newtour", newFormData)
        .then((res) => {
          setShowSections(true);
          setTour({
            ...addTour,
            cover: res.data.cover,
            tour_id: res.data.tour_id,
          });
          setTourToEdition({
            ...addTour,
            cover: res.data.cover,
            tour_id: res.data.tour_id,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="divRegister">
            <Form>
              <h1 className="h1Login">Guía nueva</h1>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre de la guía</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Málaga ciudad"
                  name="tour_name"
                  value={addTour.tour_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Descripción de la guía</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Málaga es una ciudad andaluza..."
                  name="tour_description"
                  value={addTour.tour_description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Población</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Málaga"
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
                <Form.Label>Información sobre accesibilidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. En la calle Pez hay escaleras y no rampa"
                  name="tour_acces"
                  value={addTour.tour_acces}
                  onChange={handleChange}
                />
              </Form.Group>

              <p className="mt-1">Añade una foto de portada</p>

              <label
                className="label-img d-flex align-items-center justify-content-center"
                htmlFor="file"
              >
                <img
                  className="iconSubirImg me-2"
                  src="/assets/subirImg.png"
                  alt=""
                />
              </label>
              <input
                id="file"
                name="img"
                type="file"
                onChange={handleFile}
                hidden
              ></input>

              {msgError && <p> {msgError} </p>}
              <div className="mt-4">
                <button
                  type="button"
                  className="createSectionButton"
                  variant="primary me-2"
                  onClick={handleSubmit}
                >
                  Siguiente
                </button>

                <button
                  type="button"
                  className="createSectionButton"
                  variant="primary"
                  onClick={() => navigate("/users/userprofile")}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
