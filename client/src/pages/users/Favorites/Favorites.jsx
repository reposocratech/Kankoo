import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
export const Favorites = () => {
  const [favTours, setFavTours] = useState([]);
  const { user } = useContext(KankooContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user?.user_id}/favtoursgallery`)
      .then((res) => {
        console.log(res);
        setFavTours(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.user_id]);
  return (
    <>
      {favTours?.map((elem) => {
        return <CardOneTour key={elem.tour_id} elem={elem} />;
      })}
    </>
  );
};
