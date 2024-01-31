import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import "./AdminTable.scss";
import { useNavigate } from "react-router-dom";

export const AdminToursTable = ({ everyTour, setEveryTour }) => {
  const navigate = useNavigate();

  const handleClick = (id, isDeleted) => {
    const url = `http://localhost:3000/admin/${
      isDeleted === 1 ? "enableTour" : "disableTour"
    }/${id}`;

    axios
      .put(url)
      .then((res) => {
        setEveryTour(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleGoBack = () => {
    navigate("/admin/adminProfile");
  };

  return (
    <>
      <div className="table-container  container-xxl">
        <Button className="btn-back" onClick={handleGoBack}>
          Volver
        </Button>
        <h2 className="table-title">Listado de todas las Guías:</h2>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ciudad</th>

                <th>Act/Desact</th>
                <th>Ver Guía</th>
              </tr>
            </thead>
            <tbody>
              {everyTour?.map((elem) => (
                <tr key={elem.tour_id}>
                  <td>{elem.tour_name}</td>
                  <td>{elem.tour_city}</td>

                  <td className="d-flex justify-content-center">
                    <Button
                      className={`btn-${
                        elem.tour_is_deleted === 1 ? "deactivate" : "activate"
                      }`}
                      onClick={() =>
                        handleClick(elem.tour_id, elem.tour_is_deleted)
                      }
                    >
                      {elem.tour_is_deleted === 1 ? "Activar" : "Desactivar"}
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
      </div>
    </>
  );
};
