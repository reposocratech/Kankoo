import React, { useEffect } from "react";
import axios from "axios";

export const OtherUser = () => {
  const [otherUser, setOtherUser] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/otheruser/${id}`);
  }, []);

  return (
    <>
      <h2>Guia "Nombre de guia"</h2>
      <div>
        <p>Nombre: {otherUser?.first_name}</p>
        <p>Apellidos: {otherUser?.last_name}</p>
        <p>Email: {otherUser?.email}</p>
      </div>
    </>
  );
};
