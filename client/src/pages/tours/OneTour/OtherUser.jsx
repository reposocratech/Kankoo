import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { KankooContext } from "../../../context/KankooContext";

export const OtherUser = () => {
  const { user } = useContext(KankooContext);
  const [creatorUser, setCreatorUser] = useState();
  const { creator_user_id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/viewotheruser/${creator_user_id}`)
      .then((res) => {
        setCreatorUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(creatorUser);
  return (
    <>
      <h2>Guia </h2>
      <div>
        <p>Nombre: {creatorUser?.first_name}</p>
        <p>Apellidos: {creatorUser?.last_name}</p>
        <p>Email: {creatorUser?.email}</p>
      </div>
    </>
  );
};
