import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../../helpers/localStorageUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const KankooContext = createContext();

export const KankooProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [resetImg, setResetImg] = useState(false);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      const { id } = jwtDecode(tokenLocalStorage).user;

      axios
        .get(`http://localhost:3000/users/userprofile/${id}`)
        .then((res) => {
          setUser(res.data.result);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged, resetImg]);

  return (
    <KankooContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLogged,
        setIsLogged,
        resetImg,
        setResetImg,
      }}
    >
      {children}
    </KankooContext.Provider>
  );
};
