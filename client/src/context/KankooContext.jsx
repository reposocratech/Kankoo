import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../../helpers/localStorageUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const KankooContext = createContext();

export const KankooProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [allTours, setAllTours] = useState();
  const [myTours, setMyTours] = useState();
  const [oneSection, setOneSection] = useState();

  const [token, setToken] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [resetImg, setResetImg] = useState(false);
  const [adminUsers, setAdminUsers] = useState();
  const [resetMyTours, setResetMyTours] = useState(false);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    if (tokenLocalStorage) {
      const { id, type } = jwtDecode(tokenLocalStorage).user;

      axios
        .get(`http://localhost:3000/users/userprofile/${id}`)
        .then((res) => {
          setUser(res.data.result);
          setIsLogged(true);
        })
        .catch((err) => {
          console.log(err);
        });
      if (type === 1) {
        axios
          .get("http://localhost:3000/admin/getAllUsers")
          .then((res) => {
            setAdminUsers(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [isLogged, resetImg]);

  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);

    axios
      .get(`http://localhost:3000/tours/alltours`)
      .then((res) => {
        setAllTours(res.data.resultTours);
      })
      .catch((err) => {
        console.log(err);
      });

    if (tokenLocalStorage) {
      const { id } = jwtDecode(tokenLocalStorage).user;
      axios
        .get(`http://localhost:3000/users/mytours/${id}`)
        .then((res) => {
          setMyTours(res.data.resultMyTours);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [resetMyTours]);

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
        allTours,
        setAllTours,
        adminUsers,
        setAdminUsers,
        setMyTours,
        myTours,
        resetMyTours,
        setResetMyTours,
        oneSection,
        setOneSection,
      }}
    >
      {children}
    </KankooContext.Provider>
  );
};
