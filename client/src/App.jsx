import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";
import { KankooProvider } from "./context/KankooContext";
import "./App.scss";

function App() {
  return (
    <Container fluid>
      <KankooProvider>
        <AppRoutes />
      </KankooProvider>
    </Container>
  );
}

export default App;
