import React, { useState } from "react";
import { CreateTour } from "./CreateTour";
import { CreateSection } from "./CreateSection";

export const FatherCreateTour = () => {
  const [showSections, setShowSections] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [sections, setSections] = useState([]);

  const [tour, setTour] = useState({});

  console.log("padreee", tour);
  console.log(sections);

  console.log(tour.cover);

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
          <div>
            <h2> {tour?.tour_name} </h2>

            {tour?.cover && (
              <img
                src={`http://localhost:3000/images/tours/${tour.cover}`}
                alt=""
                style={{ width: "50px", height: "50" }}
              />
            )}
          </div>

          {sections.map((elem) => {
            return <p>{elem.section_name}</p>;
          })}
          <button onClick={() => setShowFormSection(true)}>Añadir punto</button>
          {showFormSection && (
            <CreateSection
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
