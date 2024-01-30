import React from "react";

export const VideoSection = ({ sectionResources }) => {
  return (
    <video controls className="custom-video-player">
      <source
        src={`http://localhost:3000/resources/videos/${sectionResources.text}`}
        type="video/mp4"
      />
      <source
        src={`http://localhost:3000/resources/videos/${sectionResources.text}`}
        type="video/webm"
      />
    </video>
  );
};
