import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AdminOneUser = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/getOneUser/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); // Agregamos id como dependencia para que useEffect se ejecute cuando id cambie

  return (
    <>
      <h2>
        Perfil de {user?.first_name} {user?.last_name}
      </h2>
      <div>
        <div>
          <img
            src={`http://localhost:3000/images/users/${user?.avatar}`}
            alt="Foto de perfil usuario"
          />
        </div>
        <p>Email: {user?.email}</p>
      </div>
    </>
  );
};
