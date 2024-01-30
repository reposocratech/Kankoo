import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./AdminTable.scss";
import { useNavigate } from "react-router-dom";

export const AdminToursTable = ({ allTours, setAllTours }) => {
  const navigate = useNavigate();
  const handleClick = (id, isDisabled) => {
    const url = `http://localhost:3000/admin/${
      isDisabled === 1 ? "enableTour" : "disableTour"
    }/${id}`;

    axios
      .put(url)
      .then((res) => {
        setAllTours(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleGoBack = () => {
    navigate("/admin/adminProfile");
  };

  return (
    <>
      <div className="table-container">
        <h2 className="table-title">Listado de todas las Guías:</h2>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Habilitar/Deshabilitar</th>
                <th>Ver Guía</th>
              </tr>
            </thead>
            <tbody>
              {allTours?.map((elem) => (
                <tr key={elem.tour_id}>
                  <td>{elem.tour_id}</td>
                  <td>{elem.tour_name}</td>
                  <td>{elem.tour_city}</td>
                  <td>
                    {elem.tour_is_disabled ? (
                      <span className="status-circle inactive"></span>
                    ) : (
                      <span className="status-circle active"></span>
                    )}
                    {elem.tour_is_disabled ? "Inactivo" : "Activo"}
                  </td>
                  <td className="d-flex justify-content-center">
                    <Button
                      className={`btn-${
                        elem.tour_is_disabled ? "activate" : "deactivate"
                      }`}
                      onClick={() =>
                        handleClick(elem.tour_id, elem.tour_is_disabled)
                      }
                    >
                      {elem.tour_is_disabled ? "Activar" : "Desactivar"}
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn-profile"
                      onClick={() => navigate(`/tours/onetour/${elem.tour_id}`)}
                    >
                      Ver Guía
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Button className="btn-back" onClick={handleGoBack}>
          Volver
        </Button>
      </div>
    </>
  );
};
