import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./Routes/AppRoutes";
import { Container } from "react-bootstrap";
import { KankooProvider } from "./context/KankooContext";

import "./App.scss";
import { EditUser } from "./pages/users/EditUser/EditUser";

function App() {
  return (
    <Container fluid>
      <AppRoutes />
      <KankooProvider>
        <AppRoutes />
      </KankooProvider>
    </Container>
  );
}

export default App;
