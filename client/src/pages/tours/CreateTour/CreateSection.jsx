import React, { useContext } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { KankooContext } from "../../../context/KankooContext";

const initialValueSection = {
  section_name: "",
  section_description: "",
  travel_distance: "",
};

export const CreateSection = ({
  tour,
  sections,
  setSections,
  setShowFormSection,
}) => {
  console.log("Tour prop:", tour);

  const { tour_id } = tour;

  const [addSection, setAddSection] = useState(initialValueSection);
  const [files, setFiles] = useState();
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSection({ ...addSection, [name]: value });
  };

  const handleFiles = (e) => {
    console.log(e.target.files);
    const newFormData = new FormData();
    for (const elem of e.target.files) {
      newFormData.append("text", elem);
    }
    axios
      .put(`http://localhost:3000/tours/addPics/${tour_id}`, newFormData)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addSection.section_name ||
      !addSection.section_description ||
      !addSection.travel_distance
    ) {
      setMsgError("Rellena todos los campos");
    } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(addSection.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else {
      const temp = { ...addSection, tour_id: tour?.tour_id };

      axios
        .post(`http://localhost:3000/tours/addsection`, temp)
        .then((res) => {
          let tempSections = [
            ...sections,
            { ...addSection, section_id: res.data.section_id },
          ];
          setSections(tempSections);
          setShowFormSection(false);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          // Puedes agregar lógica adicional para manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
        });
    }
  };

  return (
    <>
      <Row className="createSectionGeneral">
        <h2>Crear puntos de guia</h2>
        <Col sm={2} md={2} lg={4}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre de punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
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
              <Form.Label>Distancia(km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 2.5"
                name="travel_distance"
                onChange={handleChange}
                value={addSection.travel_distance}
              />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Imagenes</Form.Label>
              <Form.Control type="file" onChange={handleFiles} multiple />
            </Form.Group>
            {msgError && <p> {msgError} </p>}
            <Button onClick={handleSubmit}>Crear punto</Button>
            <Button>Cancelar</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
