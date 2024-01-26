import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

export const AdminTable = ({ adminUsers, setAdminUsers }) => {
  console.log(adminUsers);

  const handleClick = (id, isDel) => {
    console.log(id);
    let url = `http://localhost:3000/admin/disableUser/${id}`;

    if (isDel === 1) {
      url = `http://localhost:3000/admin/enableUser/${id}`;
    }

    axios
      .put(url)
      .then((res) => {
        setAdminUsers(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div>Listado de todos los Usuarios:</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>email</th>
            <th>estado</th>
            <th>habilitar/deshabilitar</th>
            <th>Ir a su perfil</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers?.map((elem) => (
            <tr>
              <td>{elem.avatar}</td>
              <td>{elem.user_id}</td>
              <td>{elem.first_name}</td>
              <td>{elem.last_name}</td>
              <td>{elem.email}</td>
              <td>{elem.user_is_deleted ? "inactivo" : "activo"}</td>
              <td className="d-flex justify-content-center">
                <Button
                  onClick={() =>
                    handleClick(elem.user_id, elem.user_is_deleted)
                  }
                >
                  {elem.user_is_deleted ? "activar" : "bloquear"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
