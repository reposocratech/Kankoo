import React from "react";

export const VideoSection = ({ sectionResources }) => {
  return (
    <video controls>
      <source
        src={`http://localhost:3000/resources/videos/${sectionResources.text}`}
        type="video/mp4"
      />
    </video>
  );
};
