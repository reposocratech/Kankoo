import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import { KankooContext } from "../../../context/KankooContext";
import { useNavigate } from "react-router-dom";
import "./EditUser.scss";

const initialValue = {
  first_name: "",
  last_name: "",
  birthdate: "",
};

export const EditUser = () => {
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [file, setFile] = useState();

  const { user, setUser, setResetImg, resetImg } = useContext(KankooContext);

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
    console.log(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editUser.first_name || !editUser.last_name) {
      setMsgError("Algun campo no esta relleno");
    } else {
      const newFormData = new FormData();

      newFormData.append("editUser", JSON.stringify(editUser));
      newFormData.append("file", file);

      axios
        .put("http://localhost:3000/users/edituser", newFormData)
        .then((res) => {
          console.log(res);
          if (res.data.img) {
            setUser({ ...editUser, avatar: res.data.img });
          } else {
            setUser(editUser);
          }
          setResetImg(!resetImg);
          navigate("/users/userprofile");
        })
        .catch((err) => {
          console.error(err.response);
        });
    }
  };

  console.log("user", user);
  console.log("editUSer", editUser);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row>
        <Col lg={6} md={12} sm={12} xs={12}>
          <div className="divEditUser">
            <Form>
              <h2>Edita tus datos:</h2>
              <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Nombre </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={editUser.first_name}
                  onChange={handleChange}
                  name="first_name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupLastName">
                <Form.Label>Apellidos </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  value={editUser.last_name}
                  onChange={handleChange}
                  name="last_name"
                />
              </Form.Group>
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" onChange={handleFile} />
              </Form.Group>
              {msgError && <p> {msgError} </p>}
              <Button variant="danger me-2" onClick={handleSubmit}>
                Aceptar
              </Button>
              <Button variant="danger me-2">Cancelar</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
