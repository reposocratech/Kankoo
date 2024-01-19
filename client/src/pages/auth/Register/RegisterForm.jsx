import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.scss";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const initialValue = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

export const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !registerForm.first_name ||
      !registerForm.last_name ||
      !registerForm.email ||
      !registerForm.password
    ) {
      setMsgError("Algun campo no esta relleno");
    } else {
      axios
        .post("http://localhost:3000/users/registeruser", registerForm)
        .then((res) => {
          console.log(res);
          navigate("/users/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.errno === 1062) {
            setMsgError("Email duplicado");
          } else if (err.response.data.error.errno === 1406) {
            setMsgError("Campo demasiado largo ");
          } else {
            setMsgError("ups ocurrio un error");
          }
        });
    }
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <h2>Regístrate:</h2>
      <Col md={4}>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Nombre </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={registerForm.first_name}
              onChange={handleChange}
              name="first_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupLastName">
            <Form.Label>Apellidos </Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              value={registerForm.last_name}
              onChange={handleChange}
              name="last_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Contraseña </Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={registerForm.password}
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
          {msgError && <p> {msgError} </p>}
          <Button onClick={handleSubmit} className="registerButton">
            Regístrate
          </Button>
          <Button className="registerButton" onClick={() => navigate("/")}>
            Cancelar
          </Button>
          <div className="Termsandprivacytext">
            Al registrarte, aceptaras los
            <p>
              <Link to={"/users/terms"}>términos y condiciones</Link>
              <Link to={"/users/privacy"}> política de privacidad.</Link>
            </p>
          </div>
          <p>
            ¿Ya estás registrado? <span>Inicia sesión aquí</span>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
