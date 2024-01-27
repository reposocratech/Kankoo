import React from "react";

export const ImagesSection = ({ sectionResources }) => {
  /*  const imageResources = sectionResources
    ? sectionResources.filter((resource) => resource.resource_type === 1)
    : []; */

  console.log(sectionResources);

  return (
    <>
      <img
        src={`http://localhost:3000/resources/images/${sectionResources.text}`}
        alt={`Image `}
      />
    </>
  );
};
