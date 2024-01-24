import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AdminStats = () => {
  const [totalUsers, setTotalUsers] = useState();
  const [totalUsersEnabled, setTotalUsersEnabled] = useState();
  const [totalUsersDisabled, setTotalUsersDisabled] = useState();
  const { adminUsers, allTours } = useContext(KankooContext);
  const [totalTours, setTotalTours] = useState();
  const [totalToursEnabled, setTotalToursEnabled] = useState();
  const [totalToursDisabled, setTotalToursDisabled] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setTotalUsers(adminUsers?.length);
    setTotalUsersEnabled(adminUsers?.filter((e) => e.is_deleted === 0).length);
    setTotalUsersDisabled(adminUsers?.filter((e) => e.is_deleted === 1).length);
    setTotalTours(allTours?.length);
    setTotalToursEnabled(allTours?.filter((e) => e.is_deleted === 0).length);
    setTotalToursDisabled(allTours?.filter((e) => e.is_deleted === 1).length);
  }, [adminUsers, allTours]);

  return (
    <>
      <Row>
        <Col>
          <h2>Estadísticas:</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h3>Usuarios Totales</h3>
            {totalUsers}
          </div>
        </Col>
        <Col>
          <div>
            <h3>Usuarios Activados</h3>
            {totalUsersEnabled}
          </div>
        </Col>
        <Col>
          <div>
            <h3>Usuarios Desactivados</h3>
            {totalUsersDisabled}
            <Button onClick={() => navigate("/admin/adminUsers")}>
              Ver Listado de Usuarios
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h3>Guías Totales</h3>
            {totalTours}
          </div>
        </Col>
        <Col>
          <div>
            <h3>Guías activas</h3>
            {totalToursEnabled}
          </div>
        </Col>
        <Col>
          <div>
            <h3>Guías a la espera de aprobación</h3>
            {totalToursDisabled}
            <Button onClick={() => navigate("/admin/adminTours")}>
              Ver Listado de Guías
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};
