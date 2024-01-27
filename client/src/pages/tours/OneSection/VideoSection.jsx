import React from "react";

export const VideoSection = ({ sectionResources, loading }) => {
  console.log("video", sectionResources);

  /*  const videoResources = sectionResources
    ? sectionResources.filter((resource) => resource.resource_type === 3)
    : []; */

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
