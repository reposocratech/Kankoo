import React, { useEffect, useState } from "react";
import { AdminToursTable } from "../../../components/AdminTable/AdminToursTable";
import axios from "axios";

export const AdminTours = () => {
  const [everyTour, setEveryTour] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/everyTour")
      .then((res) => {
        setEveryTour(res.data.resultEveryTour);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <AdminToursTable everyTour={everyTour} setEveryTour={setEveryTour} />
    </div>
  );
};
