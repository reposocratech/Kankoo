import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import "./NoContent.scss";
import { KankooContext } from "../../context/KankooContext";
import { useNavigate } from "react-router-dom";
export const NoContent = () => {
  const { user } = useContext(KankooContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/tours/newtour");
    } else {
      navigate("/users/login");
    }
  };
  return (
    <Container className="firstCreatorContainer d-flex flex-column justify-content-center align-items-center">
      <img
        src="/icons/uno.png"
        className="firstCreator"
        alt="icono del número uno"
      />
      <p onClick={handleClick}>Sé el primero en añadir contenido</p>
    </Container>
  );
};
