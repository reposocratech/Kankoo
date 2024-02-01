import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSection.scss";

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
        let temp = { ...resourceExist };
        res.data.forEach((e) => {
          if (e.resource_type === 1) {
            temp.images = true;
            temp.image_id = e.resource_id;
          }

          if (e.resource_type === 2) {
            temp.audios = true;
            temp.audio_id = e.resource_id;
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
    if (e.target.name === "cover") setEditCover(e.target.files[0]);
    if (e.target.name === "image") setEditImages(e.target.files);
    if (e.target.name === "audio") setEditAudios(e.target.files);
    if (e.target.name === "video") setEditVideos(e.target.files);
  };

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
      newFormData.append("image", editImages);

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
          navigate(`/tours/onetour/${editSection.tour_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Col
        ref={scroll}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="divFormEditSection">
          <Form>
            <h1 className="h1Login mb-3">Edición de sección</h1>
            <p className="mt-1">Cambia la foto de portada</p>

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
              name="cover"
              type="file"
              onChange={handleResource}
              hidden
            ></input>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre del punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del punto"
                name="section_name"
                onChange={handleChange}
                value={editSection?.section_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción del punto </Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción del punto"
                name="section_description"
                onChange={handleChange}
                value={editSection?.section_description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Distancia (en km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej. 2.5"
                name="travel_distance"
                onChange={handleChange}
                value={editSection?.travel_distance}
              />
            </Form.Group>

            <Row>
              <Col lg={4}>
                <p className="mt-1">Cambia tus imágenes</p>

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
                  id="fileImages"
                  name="image"
                  type="file"
                  onChange={handleResource}
                  hidden
                ></input>
              </Col>
              <Col lg={4}>
                <p className="mt-1">Cambia el audio-guía</p>

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
                  onChange={handleResource}
                  accept="audio/*"
                  name="audio"
                  hidden
                ></input>
              </Col>
              <Col lg={4}>
                <p className="mt-1">Cambia el vídeo</p>

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
                  onChange={handleResource}
                  accept="video/*"
                  name="video"
                  hidden
                ></input>
              </Col>
            </Row>

            {msgError && <p> {msgError} </p>}
            <div>
              <button
                type="button"
                className="botonsLogin me-3"
                variant="primary me-2"
                onClick={handleSubmit}
              >
                Aceptar
              </button>

              <button
                type="button"
                className="botonsLogin"
                variant="primary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </div>
      </Col>
    </>
  );
};
