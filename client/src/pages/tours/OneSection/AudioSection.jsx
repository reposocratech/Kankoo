import React from "react";

export const AudioSection = ({ sectionResources }) => {
  return (
    <>
      <audio
        controls
        src={`http://localhost:3000/resources/audios/${sectionResources.text}`}
        className="custom-audio-player"
      ></audio>
    </>
  );
};
