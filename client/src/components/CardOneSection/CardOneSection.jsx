import React, { useContext, useEffect } from "react";
import "./CardOneSection.scss";
import { useNavigate, Link, useParams } from "react-router-dom";
import { KankooContext } from "../../context/KankooContext";

export const CardOneSection = ({ elem }) => {
  const { setOneSection } = useContext(KankooContext);
  useEffect(() => {
    setOneSection(elem);
  }, [elem]);


  const navigate = useNavigate();
  return (
    <div className="CardOneSection d-flex flex-column align-items-center">
      <img
        onClick={() => navigate(`/tours/onesection/${elem?.section_id}`)}
        className="OneTourSectionImg"
        src={`http://localhost:3000/resources/images/${elem?.section_cover}`}
        alt="portada de seccion"
      />
      <h5>{elem.section_name}</h5>
      <button type="button" className="CardOneSectionButton">
        X
      </button>
      <button
        type="button"
        className="CardOneSectionButton"
        onClick={() => navigate(`/tours/editsection/${elem?.section_id}`)}
      >
        Editar
      </button>
    </div>
  );
};
