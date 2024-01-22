import { Button, Nav, Form, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./NavbarApp.scss";
import { KankooContext } from "../../context/KankooContext";

function NavBarApp() {
  const { user, setUser } = useContext(KankooContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="NavbarBrand" as={Link} to="/">
          <img src="/logoFondoRosa.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="navEnlaces" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="navEnlaces" href="#action2">
              Top Lugares
            </Nav.Link>
          </Nav>

          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="🔍 ¿Qué le apetece visitar?"
              className="mr-2"
              aria-label="Buscar"
            />
          </Form>

          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/users/registeruser")}>
              <button className="navBoton">Registro</button>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/users/login")}>
              <button className="navBoton">Inicia sesión</button>
            </Nav.Link>
          </Nav>
          <Navbar.Brand>
            <div
              className="d-flex user"
              onClick={() => navigate("/users/userprofile")}
            >
              <p className="mt-3 me-3">
                {user?.first_name} {user?.last_name}
              </p>
              <div
                className="avatar"
                onClick={() => navigate("/users/userprofile")}
              >
                {user?.avatar ? (
                  <img
                    src={`http://localhost:3000/images/users/${user.avatar}`}
                    alt="User Avatar"
                  />
                ) : (
                  <p>{user?.first_name.charAt(0).toUpperCase()}</p>
                )}
              </div>
            </div>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;
