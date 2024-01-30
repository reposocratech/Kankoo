import React, { useContext } from "react";
import { AdminToursTable } from "../../../components/AdminTable/AdminToursTable";
import { KankooContext } from "../../../context/KankooContext";

export const AdminTours = () => {
  const { allTours, setAllTours } = useContext(KankooContext);

  return (
    <div>
      <AdminToursTable allTours={allTours} setAllTours={setAllTours} />
    </div>
  );
};
