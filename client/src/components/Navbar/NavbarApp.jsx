import { Button, Nav, Form, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./NavbarApp.scss";
import { KankooContext } from "../../context/KankooContext";
import { delLocalStorage } from "../../../helpers/localStorageUtils";

function NavBarApp() {
  const { user, setUser, token, setToken, setIsLogged } =
    useContext(KankooContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    delLocalStorage("token");
    setUser(null);
    setIsLogged(false);
    setToken();
  };

  const renderUserContent = () => {
    if (user) {
      return (
        <>
          <Nav.Link
            className="navCsesion ml-auto" // Agregado ml-auto aquí
            onClick={() => navigate("/users/userprofile")}
          >
            <button className="navBoton" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </Nav.Link>
          <Nav.Link
            className="navAvatarContainer"
            onClick={() => navigate("/users/userprofile")}
          >
            <div className="navAvatar">
              {user.avatar ? (
                <img
                  src={`http://localhost:3000/images/users/${user.avatar}`}
                  alt="User Avatar"
                  className="navAvatarImg"
                />
              ) : (
                <p className="navAvatarInitial">
                  {user.first_name.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link onClick={() => navigate("/users/registeruser")}>
            <button className="navBoton">Registro</button>
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/users/login")}>
            <button className="navBoton">Inicia sesión</button>
          </Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="NavbarBrand" as={Link} to="/">
          <img src="/logoFondoRosa.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link className="navEnlaces" href="#action2">
              Guías Top
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">{renderUserContent()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;
