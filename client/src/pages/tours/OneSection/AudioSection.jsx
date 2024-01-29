import React from "react";

export const AudioSection = ({ sectionResources }) => {
  return (
    <>
      <audio controls>
        <source
          src={`http://localhost:3000/resources/audios/${sectionResources.text}`}
          type="audio/ogg"
        />
      </audio>
    </>
  );
};
