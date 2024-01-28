import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { Button, Col, Row, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminStats.scss";

export const AdminStats = () => {
  const [totalUsers, setTotalUsers] = useState();
  const [totalUsersEnabled, setTotalUsersEnabled] = useState();
  const [totalUsersDisabled, setTotalUsersDisabled] = useState();
  const [totalTours, setTotalTours] = useState();
  const [totalToursEnabled, setTotalToursEnabled] = useState();
  const [totalToursDisabled, setTotalToursDisabled] = useState();
  const { allTours, adminUsers } = useContext(KankooContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminStats useEffect", adminUsers, allTours);
    setTotalUsers(adminUsers?.length);
    setTotalUsersEnabled(
      adminUsers?.filter((e) => e.user_is_deleted === 0).length
    );
    setTotalUsersDisabled(
      adminUsers?.filter((e) => e.user_is_deleted === 1).length
    );
    setTotalTours(allTours?.length);
    setTotalToursEnabled(
      allTours?.filter((e) => e.tour_is_deleted === 0).length
    );
    setTotalToursDisabled(
      allTours?.filter((e) => e.tour_is_deleted === 1).length
    );
  }, [adminUsers, allTours]);

  return (
    <>
      <Container className="admin-stats-container">
        <Row>
          <Col>
            <h2 className="admin-stats-title">Estadísticas:</h2>
          </Col>
        </Row>
        <Table striped bordered hover responsive className="admin-stats-table">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Total</th>
              <th>Activos</th>
              <th>Desactivados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Usuarios</td>
              <td>{totalUsers}</td>
              <td>{totalUsersEnabled}</td>
              <td>{totalUsersDisabled}</td>
              <td>
                <Button
                  onClick={() => navigate("/admin/adminUsers")}
                  className="registerButton"
                >
                  Ver Listado
                </Button>
              </td>
            </tr>
            <tr>
              <td>Guías</td>
              <td>{totalTours}</td>
              <td>{totalToursEnabled}</td>
              <td>{totalToursDisabled}</td>
              <td>
                <Button
                  onClick={() => navigate("/admin/adminTours")}
                  className="registerButton"
                >
                  Ver Listado
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};
