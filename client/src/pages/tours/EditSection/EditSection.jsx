import React, { useContext, useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSection.scss";
import { KankooContext } from "../../../context/KankooContext";
const initialEditValueSection = {
  section_name: "",
  section_description: "",
  travel_distance: "",
};

export const EditSection = () => {
  const { section_id } = useParams();

  const { oneSection, setOneSection } = useContext(KankooContext);

  console.log(oneSection);

  const [editSection, setEditSection] = useState(initialEditValueSection);
  const [msgError, setMsgError] = useState("");
  const [editCover, setEditCover] = useState();
  const [editImages, setEditImages] = useState();
  const [editAudios, setEditAudios] = useState();
  const [editVideos, setEditVideos] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOneSection({ ...oneSection, [name]: value });
    console.log(e.target.value);
  };

  const handleImages = (e) => {
    setEditImages(e.target.files);
  };

  const handleAudios = (e) => {
    setEditAudios(e.target.files);
  };

  const handleVideos = (e) => {
    setEditVideos(e.target.files);
  };

  const handleFile = (e) => {
    setEditCover(e.target.files[0]);
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{1,5}(\.\d{1,2})?$/.test(oneSection.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else {
      const newFormData = new FormData();
      newFormData.append("editSection", JSON.stringify(oneSection));

      if (editImages) {
        for (const elem of editImages) {
          newFormData.append("images", elem);
        }
      }

      if (editAudios) {
        for (const elem of editAudios) {
          newFormData.append("audios", elem);
        }
      }

      if (editVideos) {
        for (const elem of editVideos) {
          newFormData.append("videos", elem);
        }
      }
      newFormData.append("cover", editCover);
      console.log(newFormData);

      axios
        .put(
          `http://localhost:3000/tours/editsection/${section_id}`,
          newFormData
        )
        .then((res) => {
          /*  let temp = [
            ...sections,
            { ...oneSection, section_id: res.data.section_id },
          ];
          setSections(editSections); */
          console.log(res.data);
          navigate(`/tours/onetour/${oneSection.tour_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Row className="createSectionGeneral">
        <h2>Editar puntos de tu guia</h2>
        <Col sm={2} md={2} lg={4}>
          <Form>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Foto de portada</Form.Label>
              <Form.Control type="file" onChange={handleFile} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre de punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
                name="section_name"
                onChange={handleChange}
                value={oneSection?.section_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción </Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del punto"
                name="section_description"
                onChange={handleChange}
                value={oneSection?.section_description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Distancia(km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 2.5"
                name="travel_distance"
                onChange={handleChange}
                value={oneSection?.travel_distance}
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Imagenes</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImages}
                required
                multiple
                accept="image/*"
                name="image"
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Audios</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAudios}
                multiple
                accept="audio/*"
                name="audio"
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Videos</Form.Label>
              <Form.Control
                type="file"
                onChange={handleVideos}
                multiple
                accept="video/*"
                name="video"
              />
            </Form.Group>

            {msgError && <p> {msgError} </p>}
            <Button onClick={handleSubmit}>Editar punto</Button>
            <Button>Cancelar</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
