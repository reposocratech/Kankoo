import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminTable.scss";

export const AdminTable = ({ adminUsers, setAdminUsers }) => {
  const navigate = useNavigate;

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
    <div className="table-container">
      <h2 className="table-title">Listado de Usuarios</h2>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Ir a su perfil</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers?.map((elem) => (
              <tr key={elem.user_id}>
                <td>{elem.user_id}</td>
                <td>{elem.first_name}</td>
                <td>{elem.last_name}</td>
                <td>
                  {elem.user_is_deleted ? (
                    <span className="status-circle inactive"></span>
                  ) : (
                    <span className="status-circle active"></span>
                  )}
                  {elem.user_is_deleted ? "Inactivo" : "Activo"}
                </td>
                <td className="d-flex justify-content-center">
                  <Button
                    className={`btn-${
                      elem.user_is_deleted ? "activate" : "deactivate"
                    }`}
                    onClick={() =>
                      handleClick(elem.user_id, elem.user_is_deleted)
                    }
                  >
                    {elem.user_is_deleted ? "Activar" : "Bloquear"}
                  </Button>
                </td>
                <td>
                  <Button className="btn-profile">Ver perfil</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
