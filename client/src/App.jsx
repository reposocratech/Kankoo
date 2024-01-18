import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";
import { KankooProvider } from "./context/KankooContext";

<<<<<<< HEAD
=======
import "./App.scss";

>>>>>>> 332799c62ef3f5c9c1dbaa7ee14b557da9311611
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
