import React, { useState } from "react";

import { Col, Row, Form, Button } from "react-bootstrap";

const initialValue = {
  name: "",
  email: "",
  password: "",
};

export const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState(initialValue);
  const [msgError, setMsgError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Row className="d-flex justify-content-center p-5">
      <h2>Regístrate:</h2>
      <Col md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Nombre </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={registerForm.name}
              onChange={handleChange}
              name="name"
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
          <Button variant="danger me-2" type="submit">
            Regístrate
          </Button>
          <Button variant="danger me-2">Cancelar</Button>
          <p>
            Al registrarte, aceptas los <span>términos y condiciones</span> y
            <span>la política de privacidad.</span>
          </p>
          <p>
            ¿Ya estás registrado? <span>Inicia sesión aquí</span>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
