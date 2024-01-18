import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <AppRoutes />
    </Container>
  );
}

export default App;
