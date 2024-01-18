import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarApp.scss";

function NavBarApp() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          KANKOO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/allusers">
                  Top lugares
                </Nav.Link>
              </div>

              <div className="d-flex">
                <button className="navBoton me-2">Registro</button>
                <button className="navBoton me-2">Inicia sesión</button>

                <div className="d-flex user">
                  <p className="mt-3 me-3">Prueba nombre</p>
                  <div className="avatar">
                    <img />
                  </div>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;
