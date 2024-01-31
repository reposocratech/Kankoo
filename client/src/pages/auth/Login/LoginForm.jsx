import React, { useContext, useState } from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { KankooContext } from "../../../context/KankooContext";
import { saveLocalStorage } from "../../../../helpers/localStorageUtils";
import "./LoginForm.scss";

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
  const handleSubmit = (e) => {
    e.preventDefault();
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
        setMsgError(err.response.data || "Error de inicio de sesión");
      });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="divForm">
            <Form className="formlogin">
              <h1 className="h1Login">Inicia sesión</h1>
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
              <div className="mt-4">
                <button className="registerButton me-2" onClick={handleSubmit}>
                  Iniciar sesión
                </button>
                <button
                  className="registerButton"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
              <p className="pLogin mt-4">
                ¿No estás registrado/a? Regístrate{" "}
                <Link className="linkLogin" to={"/users/registeruser"}>
                  aquí
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
