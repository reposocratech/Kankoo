import React, { useContext } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { useNavigate } from "react-router-dom";

export const AdminUsers = () => {
  const { user } = useContext(KankooContext);
  const navigate = useNavigate;

  return <div>AdminUser</div>;
};
