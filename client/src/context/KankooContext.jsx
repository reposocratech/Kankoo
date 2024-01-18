import React, { createContext, useState } from "react";

export const KankooContext = createContext();

export const KankooProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [tours, setTours] = useState();

  return (
    <KankooContext.Provider
      value={{
        user,
        setUser,
        tours,
        setTours,
      }}
    >
      {children}
    </KankooContext.Provider>
  );
};
