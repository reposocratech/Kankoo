import React, { useContext, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { KankooContext } from "../../../context/KankooContext";
import { saveLocalStorage } from "../../../../helpers/localStorageUtils";

const initialValue = {
  first_name: "",
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");

  const { setUser, setToken, setIsLogged } = useContext(KankooContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/login", login)
      .then((res) => {
        console.log(res.data.user);
        navigate("/");
        setUser(res.data.user);
        setToken(res.data.token);
        saveLocalStorage("token", res.data.token);
        setIsLogged(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row className="d-flex justify-content-center">
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
            No estás registrado?{" "}
            <Link to={"/users/registeruser"}>Regístrate</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
};
