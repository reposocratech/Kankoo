import React from "react";

export const VideoSection = ({ sectionResources }) => {
  return (
    <>
      <video controls width="300">
        <source
          src={`http://localhost:3000/resources/videos/${sectionResources.text}`}
          type="video/mp4"
        />
      </video>
    </>
  );
};
