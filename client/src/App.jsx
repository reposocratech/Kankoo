import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { RegisterForm } from "./pages/auth/Register/RegisterForm";

function App() {
  const testear = (e) => {
    axios
      .get("http://localhost:3000")
      .then((res) => console.log(res, "patata Kankoo"));
  };

  return (
    <>
      <RegisterForm />
    </>
  );
}

export default App;
