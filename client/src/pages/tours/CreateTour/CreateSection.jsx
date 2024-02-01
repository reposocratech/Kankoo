import React from "react";
import { useEffect, useRef } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
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

  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollIntoView();
  }, []);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddSection({ ...addSection, [name]: value });

    if (name === "section_name" && value.length > 200) {
      setMsgError("El nombre no puede exceder los 200 caracteres.");
    } else {
      setMsgError("");
      setAddSection({ ...addSection, [name]: value });
    }
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
      console.log("1");
      setMsgError("Rellena todos los campos");
    } else if (!/^\d{1,5}(\.\d{1,2})?$/.test(addSection.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else if (!audios && !videos) {
      setMsgError("Debe proporcionar al menos un audio o video.");
    } else if (!images) {
      setMsgError("Debe proporcionar al menos una imagen.");
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
      console.log("images, audios y videos", audios, images, videos);
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
      ref={scroll}
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
            <Col lg={12}>
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
            </Col>
          </Row>

          <Row>
            <Col lg={8}>
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
            <Col lg={4}>
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
          </Row>
          <Row>
            <Col lg={12}>
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
            <Col lg={4}>
              <p className="mt-1">Añade una imagen</p>

              <label
                className="label-img d-flex align-items-center justify-content-center"
                htmlFor="fileImages"
              >
                <img
                  className="iconSubirImg me-2"
                  src="/assets/subirImg.png"
                  alt=""
                />
              </label>
              <input
                type="file"
                id="fileImages"
                hidden
                onChange={handleImages}
              />
            </Col>
            <Col lg={4}>
              <p className="mt-1">Añade un vídeo</p>

              <label
                className="label-img d-flex align-items-center justify-content-center"
                htmlFor="fileVideos"
              >
                <img
                  className="iconSubirImg me-2"
                  src="/assets/video.png"
                  alt=""
                />
              </label>
              <input
                id="fileVideos"
                type="file"
                onChange={handleVideos}
                accept="video/*"
                name="video"
                hidden
              ></input>
            </Col>
            <Col lg={4}>
              <p className="mt-1">Añade un audio</p>

              <label
                className="label-img d-flex align-items-center justify-content-center"
                htmlFor="fileAudios"
              >
                <img
                  className="iconSubirImg me-2"
                  src="/assets/auriculares.png"
                  alt=""
                />
              </label>
              <input
                id="fileAudios"
                type="file"
                onChange={handleAudios}
                accept="audio/*"
                name="audio"
                hidden
              ></input>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              {msgError && <p> {msgError} </p>}
              <div className="mt-4">
                <button className="createSectionButton" onClick={handleSubmit}>
                  Crear punto
                </button>
                <button
                  onClick={() => {
                    setShowFormSection(false);
                  }}
                  className="createSectionButton"
                >
                  Cancelar
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Col>
  );
};
