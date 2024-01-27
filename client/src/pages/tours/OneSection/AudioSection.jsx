import React from "react";

export const AudioSection = ({ sectionResources, loading }) => {
  console.log(sectionResources);

  /* const audioResources = sectionResources
    ? sectionResources.filter((resource) => resource.resource_type === 2)
    : [];
 */
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
