import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function App() {


  const testear = (e) => {
   axios.get("http://localhost:3000")
   .then((res) => console.log(res, "patata Kankoo"))
  }

  return (
    <>
     <h1>Kankoo che</h1>
    <button onClick={testear}>Epa </button>


    </>
  )
}

export default App
