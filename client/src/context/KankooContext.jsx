import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../../helpers/localStorageUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const KankooContext = createContext();

export const KankooProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [tours, setTours] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      const { id, type } = jwtDecode(tokenLocalStorage).user;

      axios.get(`http://localhost:3000/users/userprofile`).then((res) => {});
    }
  }, []);

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
