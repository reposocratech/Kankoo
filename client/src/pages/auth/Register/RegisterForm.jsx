import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.scss";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
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
    <Container>
      <Row className="mt-5">
        <Col
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <img className="regLogo" src="/logofondoblanco.png" alt="Logo" />
        </Col>
        <Col lg={6} md={12} sm={12} xs={12}>
          <div className="divRegister">
            <Form>
              <h1 className="h1Login">Regístrate </h1>
              <h2 className="h2Login mb-4">¡Comienza tu aventura!</h2>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label className="fs-5">Nombre </Form.Label>
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
              {msgError && <p className="fs-6 text-danger"> {msgError} </p>}
              <div className="mt-4">
                <button onClick={handleSubmit} className="registerButton me-2">
                  Regístrate
                </button>
                <button
                  className="registerButton"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
              <p className="pLink mt-4">
                ¿Ya está registrado/a? Inicia sesión{" "}
                <Link to={"/users/login"} className="linkRegister">
                  aquí
                </Link>
              </p>
              <div className="Termsandprivacytext">
                <p className="pLink">
                  Al registrarte, aceptas nuestros{" "}
                  <Link to={"/users/terms"} className="linkRegister">
                    términos y condiciones
                  </Link>{" "}
                  y nuestra{" "}
                  <Link to={"/users/privacy"} className="linkRegister">
                    política de privacidad
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
