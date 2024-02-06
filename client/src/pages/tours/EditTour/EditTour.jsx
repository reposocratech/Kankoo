import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

  const { myTours, setMyTours } = useContext(KankooContext);

  const { tour_id } = useParams();

  useEffect(() => {
    if (myTours) {
      let temp = myTours?.filter((e) => e.tour_id === Number(tour_id));
      setEditTour(temp[0]);
    }
  }, [myTours]);

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
    newFormData.append("file", editFile);

    axios
      .put(`http://localhost:3000/tours/edittour/${tour_id}`, newFormData)
      .then((res) => {
        let temp = [...myTours];

        let finalTemp = temp.map((e) => {
          if (e.tour_id === Number(tour_id)) {
            let result = editTour;

            if (res.data.cover) {
              console.log("aquiiiii", res.data.cover);
              result = { ...editTour, cover: res.data.cover };
            }

            return result;
          } else {
            return e;
          }
        });
        setMyTours(finalTemp);
        navigate(-1);
      })
      .catch((err) => {
        console.log("Error en la solicitud:", err.response);
      });
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
      <div className="divFormEditSection">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <h1 className="h1Login mb-3">Edición de guía</h1>
            <Form.Label>Nombre de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la guía"
              name="tour_name"
              value={editTour?.tour_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripción de la guía</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción de la guía"
              name="tour_description"
              value={editTour?.tour_description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ciudad"
              name="tour_city"
              value={editTour?.tour_city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduce el link de la ubicación"
              name="location"
              value={editTour?.location}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Accesibilidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Info acces"
              name="tour_acces"
              value={editTour?.tour_acces}
              onChange={handleChange}
            />
          </Form.Group>

          <p className="mt-1">Cambia tu imagen de portada</p>

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
  );
};
