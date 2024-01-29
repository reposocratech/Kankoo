import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { Button, Card, Container } from "react-bootstrap";
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
    setTotalUsers(adminUsers?.length);
    setTotalUsersEnabled(
      adminUsers?.filter((e) => e.user_is_deleted === 0).length
    );
    setTotalUsersDisabled(
      adminUsers?.filter((e) => e.user_is_deleted === 1).length
    );
    setTotalTours(allTours?.length);
    setTotalToursEnabled(
      allTours?.filter((e) => e.tour_is_disabled === 0).length
    );
    setTotalToursDisabled(
      allTours?.filter((e) => e.tour_is_disabled === 1).length
    );
  }, [adminUsers, allTours]);

  return (
    <>
      <Container className="admin-stats-container">
        <h2 className="admin-stats-title">Estadísticas:</h2>
        <div className="admin-stats-cards">
          <Card>
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Total: {totalUsers}</Card.Text>
              <Card.Text>Activos: {totalUsersEnabled}</Card.Text>
              <Card.Text>Desactivados: {totalUsersDisabled}</Card.Text>
              <Button
                onClick={() => navigate("/admin/adminUsers")}
                className="registerButton"
              >
                Ver Listado
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Guías</Card.Title>
              <Card.Text>Total: {totalTours}</Card.Text>
              <Card.Text>Activos: {totalToursEnabled}</Card.Text>
              <Card.Text>Desactivados: {totalToursDisabled}</Card.Text>
              <Button
                onClick={() => navigate("/admin/adminTours")}
                className="registerButton"
              >
                Ver Listado
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};
