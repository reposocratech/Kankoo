import React, { useContext } from "react";
import { AdminTable } from "../../../components/AdminTable/AdminTable";
import { KankooContext } from "../../../context/KankooContext";

export const AdminUsers = () => {
  const { adminUsers, setAdminUsers } = useContext(KankooContext);

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <AdminTable adminUsers={adminUsers} setAdminUsers={setAdminUsers} />
    </div>
  );
};
