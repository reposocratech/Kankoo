import React, { useContext, useState } from "react";
import { Form, FormControl, Col, Row, Container } from "react-bootstrap";
import "./OneUser.scss";
import { KankooContext } from "../../../context/KankooContext";
import { useNavigate } from "react-router-dom";

export const OneUser = () => {
  const [viewOneUser, setViewOneUser] = useState(false);
  const { oneUser } = useContext(KankooContext);
  const navigate = useNavigate();
  return (
    <Container className="oneUser d-flex flex-column align-items-center">
      <Row>
        <Col>
          <div>
            <img src="" alt="foto usuario" />
            <h1>un random</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
