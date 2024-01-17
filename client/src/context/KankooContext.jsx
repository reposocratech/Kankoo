import React, { createContext } from "react";

export const KankooContext = createContext();

export const KankooProvider = ({ children }) => {};

return <KankooContext.Provider>{children}</KankooContext.Provider>;


