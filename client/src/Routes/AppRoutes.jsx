import React, { useContext } from "react";
import { Navbar, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarApp from "../components/Navbar/NavbarApp";
import { ToursGallery } from "../pages/tours/HomeToursGallery/ToursGallery";

import { MyTours } from "../pages/users/MyTours/MyTours";
import { Favorites } from "../pages/users/Favorites/Favorites";
import { EditUser } from "../pages/users/EditUser/EditUser";
import { BoughtTours } from "../pages/users/BoughtTours/BoughtTours";
import { TermsConditions } from "../pages/TermsConditions/TermsConditions";
import { PrivacyPolicy } from "../pages/PrivacyPolicy/PrivacyPolicy";
import { RegisterForm } from "../pages/auth/Register/RegisterForm";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { FatherCreateTour } from "../pages/tours/CreateTour/FatherCreateTour";
import { LoginForm } from "../pages/auth/Login/LoginForm";
import { WaitingValidation } from "../pages/tours/WaitingValidation/WaitingValidation";
import { KankooContext } from "../context/KankooContext";
import { OneTour } from "../pages/tours/OneTour/OneTour";
import { AdminProfile } from "../pages/admin/AdminProfile/AdminProfile";
import { AdminStats } from "../pages/admin/AdminStats/AdminStats";
import { AdminTours } from "../pages/admin/AdminTours/AdminTours";
import { AdminUsers } from "../pages/admin/AdminUsers/AdminUsers";
import { OneSection } from "../pages/tours/OneSection/OneSection";
import { OneUser } from "../pages/users/OneUser/OneUser";
import { EditTour } from "../pages/tours/EditTour/EditTour";
import { UserProfile } from "../pages/users/UserProfile/UserProfile";
export const AppRoutes = () => {
  const { token, user } = useContext(KankooContext);

  return (
    <BrowserRouter>
      <Row>
        <NavBarApp />
        <Routes>
          <Route path="/" element={<ToursGallery />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/tours/onetour/:tour_id" element={<OneTour />} />
          <Route path="/users/oneuser" element={<OneUser />} />
          {!token && !user && <></>}
          <Route path="/users/registeruser" element={<RegisterForm />} />
          <Route path="/users/login" element={<LoginForm />} />

          {token && user && (
            <>
              <Route path="/users/mytours" element={<MyTours />} />
              <Route path="/users/edituser" element={<EditUser />} />
              <Route path="/tours/newtour" element={<FatherCreateTour />} />
              <Route
                path="/tours/onesection/:section_id"
                element={<OneSection />}
              />
              <Route path="/tours/edittour/:tour_id" element={<EditTour />} />
            </>
          )}
          {token && user?.user_type === 2 && (
            <>
              <Route path="/users/userprofile" element={<UserProfile />} />
              <Route path="/users/favtours" element={<Favorites />} />
              <Route path="/users/boughttours" element={<BoughtTours />} />
              <Route path="/users/terms" element={<TermsConditions />} />
              <Route path="/users/privacy" element={<PrivacyPolicy />} />
              <Route path="/tours/waiting" element={<WaitingValidation />} />
            </>
          )}
          {token && user?.user_type === 1 && (
            <>
              <Route path="/admin/adminProfile" element={<AdminProfile />} />
              <Route path="/admin/adminStats" element={<AdminStats />} />
              <Route path="/admin/adminTours" element={<AdminTours />} />
              <Route path="/admin/adminUsers" element={<AdminUsers />} />
            </>
          )}
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
