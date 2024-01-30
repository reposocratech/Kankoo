import React from "react";

export const AudioSection = ({ sectionResources }) => {
  return (
    <>
      <audio controls className="custom-audio-player">
        <source
          src={`http://localhost:3000/resources/audios/${sectionResources.text}`}
          type="audio/ogg"
        />
        <source
          src={`http://localhost:3000/resources/audios/${sectionResources.text}`}
          type="audio/mpeg"
        />
      </audio>
    </>
  );
};
