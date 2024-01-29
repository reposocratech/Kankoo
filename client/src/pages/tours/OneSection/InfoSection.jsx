import React from "react";

export const InfoSection = ({ oneSection }) => {
  return (
    <>
      <h5>Info</h5>
      <p> {oneSection?.section_description} </p>
    </>
  );
};
