import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AdminTable.scss";

export const AdminTable = ({ adminUsers, setAdminUsers }) => {
  const navigate = useNavigate();

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
        const newUserIsDeletedValue = isDel === 1 ? true : false;

        axios
          .put(`http://localhost:3000/admin/updateUserIsDeletedStatus/${id}`, {
            user_is_deleted: newUserIsDeletedValue,
          })
          .then(() => {
            navigate(`/users/oneuser/${id}`);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const handleGoBack = () => {
    navigate("/admin/adminProfile");
  };

  return (
    <div className="table-container  container-xxl">
      <Button className="btn-back" onClick={handleGoBack}>
        Volver
      </Button>
      <h2 className="table-title">Listado de Usuarios</h2>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
              <th>Ir a su perfil</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers?.map((elem) => (
              <tr key={elem.user_id}>
                <td>
                  {elem.first_name} {elem.last_name}
                </td>
                <td>{elem.user_is_deleted ? "Inactivo" : "Activo"}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    className={`btn-${
                      elem.user_is_deleted ? "deactivate" : "activate"
                    }`}
                    onClick={() =>
                      handleClick(elem.user_id, elem.user_is_deleted)
                    }
                  >
                    {elem.user_is_deleted ? "Activar" : "Bloquear"}
                  </Button>
                </td>
                <td>
                  <Button
                    className="btn-profile"
                    onClick={() =>
                      navigate(`/admin/getOneUser/${elem.user_id}`)
                    }
                  >
                    Ver perfil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
