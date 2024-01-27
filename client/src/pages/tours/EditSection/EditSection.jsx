import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSection.scss";
import { KankooContext } from "../../../context/KankooContext";

export const EditSection = () => {
  const [editSection, setEditSection] = useState();

  const [resourceExist, setResourceExist] = useState({
    images: false,
    image_id: null,
    audio_id: null,
    video_id: null,
    audios: false,
    videos: false,
  });

  const { section_id, tour_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/getonesection/${section_id}/${tour_id}`)
      .then((res) => setEditSection(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/tours/onesectionresource/${tour_id}/${section_id}`
      )
      .then((res) => {
        console.log(res.data);
        let temp = { ...resourceExist };
        res.data.forEach((e) => {
          if (e.resource_type === 1) {
            temp.images = true;
            temp.audio_id = e.resource_id;
          }

          if (e.resource_type === 2) {
            temp.audios = true;
            temp.image_id = e.resource_id;
          }
          if (e.resource_type === 3) {
            temp.videos = true;
            temp.video_id = e.resource_id;
          }
          setResourceExist(temp);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(resourceExist);

  const [msgError, setMsgError] = useState("");
  const [editCover, setEditCover] = useState();
  const [editImages, setEditImages] = useState();
  const [editAudios, setEditAudios] = useState();
  const [editVideos, setEditVideos] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSection({ ...editSection, [name]: value });
  };

  const handleResource = (e) => {
    console.log(e.target.files);

    if (e.target.name === "cover") setEditCover(e.target.files[0]);
    if (e.target.name === "image") setEditImages(e.target.files);
    if (e.target.name === "audio") setEditAudios(e.target.files);
    if (e.target.name === "video") setEditVideos(e.target.files);
  };

  console.log(editCover);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{1,5}(\.\d{1,2})?$/.test(editSection?.travel_distance)) {
      setMsgError(
        "El formato de travel_distance no es válido. Debe tener un máximo de 5 dígitos antes del punto y 2 dígitos después del punto."
      );
    } else {
      const newFormData = new FormData();
      newFormData.append("editSection", JSON.stringify(editSection));
      newFormData.append("resourceExist", JSON.stringify(resourceExist));
      newFormData.append("cover", editCover);

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

      axios
        .put(
          `http://localhost:3000/tours/editsection/${section_id}`,
          newFormData
        )
        .then((res) => {
          console.log(res.data);
          navigate(`/tours/onetour/${editSection.tour_id}`);
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
              <Form.Control
                type="file"
                onChange={handleResource}
                name="cover"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre de punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
                name="section_name"
                onChange={handleChange}
                value={editSection?.section_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción </Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del punto"
                name="section_description"
                onChange={handleChange}
                value={editSection?.section_description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Distancia(km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 2.5"
                name="travel_distance"
                onChange={handleChange}
                value={editSection?.travel_distance}
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Imagenes</Form.Label>
              <Form.Control
                type="file"
                onChange={handleResource}
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
                onChange={handleResource}
                multiple
                accept="audio/*"
                name="audio"
              />
            </Form.Group>

            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Videos</Form.Label>
              <Form.Control
                type="file"
                onChange={handleResource}
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
