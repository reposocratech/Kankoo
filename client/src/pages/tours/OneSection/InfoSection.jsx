import React from "react";

export const InfoSection = ({ oneSection }) => {
  return (
    <>
      <h5>Descripcion</h5>
      <div className="OneSectionResourceInfoDescription">
        <p> {oneSection?.section_description} </p>
      </div>
    </>
  );
};
