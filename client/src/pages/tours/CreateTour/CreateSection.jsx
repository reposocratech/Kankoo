import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import "./CreateTour.scss";

const initialValueSection = {
  section_name: "",
  section_description: "",
  travel_distance: "",
};

export const CreateSection = ({
  tour,
  setShowFormSection,
  resetSections,
  setResetSections,
}) => {
  const { tour_id } = useParams();
  const [addSection, setAddSection] = useState(initialValueSection);
  const [cover, setCover] = useState();
  const [images, setImages] = useState();
  const [audios, setAudios] = useState();
  const [videos, setVideos] = useState();
  const [msgError, setMsgError] = useState("");
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSection({ ...addSection, [name]: value });
  };
  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const handleAudios = (e) => {
    setAudios(e.target.files);
  };

  const handleVideos = (e) => {
    setVideos(e.target.files);
  };
  const handleFile = (e) => {
    setCover(e.target.files[0]);
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addSection.section_name ||
      !addSection.section_description ||
      !addSection.travel_distance ||
      !cover
    ) {
      setMsgError("Rellena todos los campos");
    } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(addSection.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else {
      let temp = {
        ...addSection,
        tour_id: tour_id || tour?.tour_id,
      };

      const newFormData = new FormData();
      newFormData.append("addSection", JSON.stringify(temp));

      if (images) {
        for (const elem of images) {
          newFormData.append("images", elem);
        }
      }

      if (audios) {
        for (const elem of audios) {
          newFormData.append("audios", elem);
        }
      }

      if (videos) {
        for (const elem of videos) {
          newFormData.append("videos", elem);
        }
      }
      newFormData.append("cover", cover);
      console.log(newFormData);
      axios
        .post(`http://localhost:3000/tours/addsection`, newFormData)
        .then((res) => {
          if (pathname === `/tours/newsection/${tour_id}`) {
            navigate(-1);
          } else {
            setResetSections(!resetSections);
            setShowFormSection(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Col
      lg={12}
      md={12}
      sm={12}
      xs={12}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="divFormSection">
        <Form className="formlogin">
          <h1 className="h1Login mb-3">Nuevo punto</h1>
          <Row>
            <Col lg={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Foto de portada</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFile}
                  accept="image/*"
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Calle Larios"
                  name="section_name"
                  onChange={handleChange}
                  value={addSection.section_name}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={2}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Distancia (en km)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej. 2.5"
                  name="travel_distance"
                  onChange={handleChange}
                  value={addSection.travel_distance}
                />
              </Form.Group>
            </Col>
            <Col lg={10}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Descripción </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Es la calle más emblemática de..."
                  name="section_description"
                  onChange={handleChange}
                  value={addSection.section_description}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImages}
                  required
                  multiple
                  accept="image/*"
                  name="image"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Audio-guía</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleAudios}
                  accept="audio/*"
                  name="audio"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Vídeo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleVideos}
                  accept="video/*"
                  name="video"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              {msgError && <p> {msgError} </p>}
              <div className="botonsLogin">
                <button className="createSectionButton" onClick={handleSubmit}>
                  Crear punto
                </button>
                <button className="createSectionButton">Cancelar</button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Col>
  );
};
