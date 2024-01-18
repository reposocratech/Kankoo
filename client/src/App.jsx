import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";
import "./App.scss";

function App() {
  return (
    <Container fluid>
      <AppRoutes />
    </Container>
  );
}

export default App;
