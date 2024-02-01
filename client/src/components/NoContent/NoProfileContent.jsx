import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./NoContent.scss";
import { KankooContext } from "../../context/KankooContext";
export const NoProfileContent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(KankooContext);
  const handleClick = () => {
    if (user) {
      if (pathname === "/users/mytours") {
        navigate("/tours/newtour");
      } else {
        navigate("/");
      }
    } else {
      navigate("/users/login");
    }
  };
  return (
    <Container className="firstCreatorContainer d-flex flex-column justify-content-center align-items-center">
      <img
        src="/icons/iconUbi.png"
        className="firstCreator"
        alt="icono de ruta"
      />
      <p onClick={handleClick}>Aún no has añadido ningún tour</p>
    </Container>
  );
};
