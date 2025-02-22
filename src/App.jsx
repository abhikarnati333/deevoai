import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import { Context } from "./context/Context";
import BuyCredit from "./pages/BuyCredit";
import Sidebar from "./components/Sidebar/Sidebar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ExportPlaylist from "./pages/ExportPlaylist";
import Loginpage from "./pages/LandingPage";
import Verify from "./pages/Verify";
import Soundwaves from "./pages/Soundwaves";

const App = () => {
  const { showLogin, user } = useContext(Context);

  return (
    <>
      <ToastContainer position="top-center" theme="light" />

      {showLogin && <Login />}

      <Routes>
        {/* Public routes */}
        {!user && (
          <>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/credits" element={<BuyCredit />} />
            <Route path='/verify' element={<Verify />} />
            <Route path="/soundwaves" element={<Soundwaves />} />
            <Route
              path="/export"
              element={
                <>
                  <ExportPlaylist />
                  {user ? <Sidebar /> : null}
                </>
              }
            />
            {/* Redirect all other routes for unauthenticated users */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Authenticated routes */}
        {user && (
          <>
            <Route
              path="/"
              element={
                <>
                  <Main />
                  <Sidebar />
                </>
              }
            />
            <Route path="/credits" element={<BuyCredit />} />
            <Route path='/verify' element={<Verify />} />
            <Route path="/soundwaves" element={<Soundwaves />} />

            <Route
              path="/export"
              element={
                <>
                  <ExportPlaylist />
                  {user ? <Sidebar /> : null}
                </>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* Redirect from login for authenticated users */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Handle 404 for authenticated users */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
