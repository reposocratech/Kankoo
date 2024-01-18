import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const initialValue = {
  first_name: "",
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/login", login)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col md={6}>
        <p>
          Entra y viaja sin ataduras con nuestras guías turísticas digitales.
          Vídeos y audios en tu smartphone para descubrir destinos a tu propio
          ritmo
        </p>
      </Col>
      <Col md={6}>
        <Form>
          <h1>Bienvenid@</h1>
          <h3>Inicie sesión</h3>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
          </Form.Group>
          <p>{msgError}</p>

          <Button variant="primary me-2" onClick={handleSubmit}>
            Iniciar sesión
          </Button>
          <Button variant="primary" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <p>
            No estás registrado? <Link to={"/register"}>Regístrate</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
