import React from "react";
import { Navbar, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarApp from "../components/Navbar/NavbarApp";
import { ToursGallery } from "../pages/tours/HomeToursGallery/ToursGallery";
import { UserProfile } from "../pages/users/UserProfile/UserProfile";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
        <Routes>
          <Route path="/" element={<ToursGallery />} />
          <Route path="/users/userprofile" element={<UserProfile />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
