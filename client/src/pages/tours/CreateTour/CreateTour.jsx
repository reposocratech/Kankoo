import React, { useContext, useEffect, useState } from "react";
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
};

export const CreateTour = () => {
  const [addTour, setAddTour] = useState(initialValueTour);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const { user } = useContext(KankooContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTour({ ...addTour, [name]: value });
    console.log(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addTour.tour_name ||
      !addTour.tour_description ||
      !addTour.tour_city ||
      !addTour.location
    ) {
      setMsgError("Rellena todos los campos");
    } else {
      const newFormData = new FormData();
      const temp = { ...addTour, user_id: user?.user_id };
      newFormData.append("addTour", JSON.stringify(temp));
      newFormData.append("file", file);

      axios
        .post("http://localhost:3000/tours/newtour", newFormData)
        .then((res) => {
          if (res.data.img) {
            setAddTour({ ...addTour, cover: res.data.img });
          } else {
            setAddTour(addTour);
          }
          navigate("/users/userprofile");
        })
        .catch((err) => {
          console.log(err.response);
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
          <p>Puntos creados: </p>
          {/*   <div className='contPictures'>
        {images?.map((elem)=>{
            return(
                <div key={elem.picture_id}>
                    <img src={`http://localhost:3000/images/travels/${elem.picture_img}`} alt="" />
                    <button 
                        onClick={()=>delPicture(elem.picture_id)}
                        style={{color:"red", border:"none"}}>
                        <img 
                            style={{width:"40px", height:"40px", color:"red"}}
                        src={trash}/>
                    </button>
                </div>
            )
        })}
        <div></div> */}
        </Form>
      </Col>
    </Row>
  );
};
