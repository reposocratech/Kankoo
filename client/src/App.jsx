import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";
import { RegisterForm } from "./pages/auth/Register/RegisterForm";

function App() {
  return (
    <Container fluid>
      <AppRoutes />
    </Container>
  );
}

export default App;
