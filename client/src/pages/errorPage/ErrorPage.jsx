import React from "react";
import "./ErrorPage.scss";
import { Col, Row, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row>
        <div>
          <button className="error-btn" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
        <Col className="text-center error-image-container">
          <img src="/assets/404.png" alt="ErrorImg" className="error-image" />
        </Col>
      </Row>
    </Container>
  );
};
