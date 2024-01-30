import React from "react";
import "./ErrorPage.scss";
import { Col, Row, Container } from "react-bootstrap";

export const ErrorPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center error-image-container">
          <img src="/assets/404.png" alt="ErrorImg" className="error-image" />
        </Col>
      </Row>
    </Container>
  );
};
