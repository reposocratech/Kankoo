import React from "react";
import "./CardOneSection.scss";

export const CardOneSection = ({ elem }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        onClick={() => navigate(`/tours/onesection/${elem?.section_id}`)}
        className="OneTourSectionImg"
        src={`http://localhost:3000/resources/images/${elem?.section_cover}`}
        alt="portada de seccion"
      />
      <h5>{elem.section_name}</h5>
    </div>
  );
};
