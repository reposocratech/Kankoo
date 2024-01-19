import React from "react";
import { Navbar, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarApp from "../components/Navbar/NavbarApp";
import { ToursGallery } from "../pages/tours/HomeToursGallery/ToursGallery";
import { UserProfile } from "../pages/users/UserProfile/UserProfile";
import { MyTours } from "../pages/users/MyTours/MyTours";
import { Favorites } from "../pages/users/Favorites/Favorites";
import { EditUser } from "../pages/users/EditUser/EditUser";
import { BoughtTours } from "../pages/users/BoughtTours/BoughtTours";
import { CreateTour } from "../pages/tours/CreateTour/CreateTour";
import { TermsConditions } from "../pages/TermsConditions/TermsConditions";
import { PrivacyPolicy } from "../pages/PrivacyPolicy/PrivacyPolicy";
import { RegisterForm } from "../pages/auth/Register/RegisterForm";
import { LoginForm } from "../pages/auth/Login/LoginForm";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
        <Routes>
          <Route path="/" element={<ToursGallery />} />
          <Route path="/users/userprofile" element={<UserProfile />} />
          <Route path="/users/registeruser" element={<RegisterForm />} />
          <Route path="/users/mytours" element={<MyTours />} />
          <Route path="/users/favtours" element={<Favorites />} />
          <Route path="/users/boughttours" element={<BoughtTours />} />
          <Route path="/users/edituser" element={<EditUser />} />
          <Route path="/tours/newtour" element={<CreateTour />} />
          <Route path="/users/terms" element={<TermsConditions />} />
          <Route path="/users/privacy" element={<PrivacyPolicy />} />
          <Route path="/users/login" element={<LoginForm />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
