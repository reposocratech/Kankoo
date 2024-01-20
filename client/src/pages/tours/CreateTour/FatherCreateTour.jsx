import React, { useState } from "react";
import { CreateTour } from "./CreateTour";
import { CreateSection } from "./CreateSection";

export const FatherCreateTour = () => {
  const [showFormSection, setShowFormSection] = useState(false);

  return (
    <>
      <CreateTour />

      <button onClick={() => setShowFormSection(true)}> Añadir punto </button>
      {showFormSection && <CreateSection />}
    </>
  );
};
