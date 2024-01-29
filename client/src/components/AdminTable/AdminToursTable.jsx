import React from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

export const AdminToursTable = ({ allTours, setAllTours }) => {
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

  return (
    <>
      <div>Listado de todas las Guías:</div>
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
              <td>{elem.tour_is_disabled ? "inactivo" : "activo"}</td>
              <td className="d-flex justify-content-center">
                <Button
                  onClick={() =>
                    handleClick(elem.tour_id, elem.tour_is_disabled)
                  }
                >
                  {elem.tour_is_disabled ? "Activar" : "Desactivar"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
