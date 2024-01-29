import React, { useState, useEffect } from "react";
import { CreateTour } from "./CreateTour";
import { CreateSection } from "./CreateSection";
import "./CreateTour.scss";
import axios from "axios";
export const FatherCreateTour = () => {
  const [showSections, setShowSections] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [sections, setSections] = useState([]);
  const [resetSections, setResetSections] = useState(false);

  const [tour, setTour] = useState({});

  console.log("padreee", tour);
  console.log(sections);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/onetour/${tour.tour_id}`)
      .then((res) => {
        setSections(res.data.resultOneTour);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [resetSections, tour]);

  return (
    <>
      {!showSections && (
        <CreateTour
          setShowSections={setShowSections}
          tour={tour}
          setTour={setTour}
        />
      )}

      {showSections && (
        <>
          <div className="fatherCover">
            <h3>Guía turística de </h3>
            <h2> {tour?.tour_name} </h2>

            {tour?.cover && (
              <img
                src={`http://localhost:3000/images/tours/${tour.cover}`}
                alt=""
                style={{ width: "200px", height: "200" }}
              />
            )}
          </div>
          <div className=" d-flex flex-column">
            {sections.map((elem) => {
              return (
                <div className="fatherSectionTitle">
                  <h4>Secciones añadidas</h4>
                  <div className="fatherSectionAdded">
                    <p>{elem.section_name}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="fatherButton"
              onClick={() => setShowFormSection(true)}
            >
              Añadir punto
            </button>
          </div>
          {showFormSection && (
            <CreateSection
              resetSections={resetSections}
              setResetSections={setResetSections}
              setShowFormSection={setShowFormSection}
              tour={tour}
              sections={sections}
              setSections={setSections}
            />
          )}
        </>
      )}
    </>
  );
};
