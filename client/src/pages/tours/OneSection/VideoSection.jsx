import React from "react";

export const VideoSection = ({ sectionResources }) => {
  return (
    <div>
      <video
        controls
        src={`http://localhost:3000/resources/videos/${sectionResources.text}`}
        className="custom-video-player"
      ></video>
    </div>
  );
};
