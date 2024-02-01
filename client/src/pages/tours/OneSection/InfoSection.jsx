import React from "react";
import "./OneSection.scss";

export const InfoSection = ({ oneSection }) => {
  return (
    <>
      <h5>Descripcion</h5>

      <p>{oneSection?.section_description}</p>

      <h5>Distancia</h5>
      <p>{oneSection?.travel_distance}km</p>
    </>
  );
};
