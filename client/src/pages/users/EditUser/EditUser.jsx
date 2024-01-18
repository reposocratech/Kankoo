import React, { useState } from "react";
import axios from "axios";

import { Col, Row, Form, Button } from "react-bootstrap";

const initialValue = {
  first_name: "",
  last_name: "",
  birthdate: "",
};

export const EditUser = () => {
  const [editUser, setEditUser] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [avatar, setAvatar] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editUser.first_name || !editUser.last_name || !editUser.birthdate) {
      setMsgError("Algun campo no esta relleno");
    } else {
      const newFormData = new FormData();
      newFormData.append("editUser", JSON.stringify(editUser));

      axios
        .put("http://localhost:3000/users/edituser", editUser)
        .then((res) => {
          console.log(res);
          setEditUser(editUser);
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

  const handleFile = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <>
      <h2>Hola "Colocar nombre de usuario"</h2>
      <Row className="d-flex justify-content-center p-5">
        <h2>Edita tus datos:</h2>
        <Col md={4}>
          <Form>
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
            <Form.Group className="mb-3" controlId="formGroupBirthday">
              <Form.Label>Fecha de nacimiento </Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de nacimiento"
                value={editUser.birthdate}
                onChange={handleChange}
                name="birthdate"
              />
            </Form.Group>

            {msgError && <p> {msgError} </p>}
            <Button variant="danger me-2" onClick={handleSubmit}>
              Aceptar
            </Button>
            <Button variant="danger me-2">Cancelar</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
