import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import Contact from "../components/Contact/Contact";
import { assets } from "../assets/assets";
import ReactGA from "react-ga4";

const TermsOfService = () => {
  const { navigate, setShowLogin, user } = useContext(Context);
  const [isContactOpen, setisContactOpen] = useState(false);
  const openContact = () => setisContactOpen(true);
  const closeContact = () => setisContactOpen(false);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/terms-of-service", title: "Terms of Service Page" })
  }, []);
  
  return (
    <div className="flex-1 min-h-screen relative">
      <Contact isOpen={isContactOpen} closeMenu={closeContact} />
      {/* Header Section */}
      <header className="sticky top-0 sm:top-5 px-5">
        <div className="flex justify-between items-center text-xl sm:text-2xl p-5 sm:p-3 px-5 text-[#202020] mx-auto sm:max-w-5xl sm:border sm:border-[#222]/10 sm:rounded-2xl bg-white">
          <div className="flex items-center">
            <p
              onClick={() => {
                navigate("/");
              }}
              className="italic cursor-pointer"
            >
              Deevo
            </p>
          </div>
          <div className="flex gap-7">
            <div className="hidden sm:block items-center gap-2 sm:gap-4">
              <a
                onClick={() => {
                  navigate("/soundwaves");
                }}
                className="text-lg cursor-pointer hover:opacity-65"
              >
                Soundwaves
              </a>
            </div>
            <div className="hidden sm:block items-center gap-2 sm:gap-4">
              <a
                onClick={() => {
                  navigate("/credits");
                }}
                className="text-lg cursor-pointer hover:opacity-65"
              >
                Credits
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative cursor-pointer hover:opacity-65">
                    <img
                      onClick={() => {
                        navigate("/");
                      }}
                      className="w-9 sm:w-10"
                      src={assets.account_icon}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      navigate("/");
                    }}
                    className="bg-[#202020] text-white px-7 py-1 rounded-full text-lg hover:opacity-65"
                  >
                    Get Started
                  </button>
                  {/* <button onClick={()=>setShowLogin("Sign Up")} className="bg-[#f0f4f9] text-[#202020] px-7 py-1 rounded-full text-lg hover:opacity-65">Sign Up</button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-700 italic mb-6">Effective January 5th, 2025</p>
        <p className="text-gray-700 mb-6">
          Welcome to Deevo! By accessing or using our platform, you agree to
          comply with these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 mb-6">
          By creating an account or using Deevo, you acknowledge that you have
          read, understood, and agree to be bound by these Terms of Service and
          our{" "}
          <span
            onClick={() => {
              window.open("/privacy-policy", "_blank");
            }}
            className="cursor-pointer underline underline-offset-2 hover:opacity-65"
          >
            Privacy Policy
          </span>
          .
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          2. User Responsibilities
        </h2>
        <p className="text-gray-700 mb-6">
          - You must provide accurate and current information during the
          registration process.
          <br />
          - You are responsible for safeguarding your account credentials.
          <br />- You agree not to misuse our platform, including attempting to
          gain unauthorized access or disrupt our services.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          3. Platform Usage
        </h2>
        <p className="text-gray-700 mb-6">
          Deevo is designed to generate personalized playlists. You may use it
          only for lawful purposes and in compliance with these terms. Any
          unauthorized use is prohibited.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          4. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-6">
          All content, designs, and features of Deevo are protected under
          intellectual property laws. You may not copy, reproduce, or distribute
          any part of the platform without explicit permission.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          5. Third-Party Services
        </h2>
        <p className="text-gray-700 mb-6">
          Deevo integrates with third-party services like Spotify. You
          acknowledge that your use of these services is governed by their
          respective terms and privacy policies.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-6">
          Deevo is provided "as is" without any warranties. We are not liable
          for any damages resulting from your use of the platform, including
          loss of data or interruptions.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          7. Termination
        </h2>
        <p className="text-gray-700 mb-6">
          We reserve the right to suspend or terminate your account if you
          violate these terms or engage in behavior that harms our platform or
          other users.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          8. Modifications to Terms
        </h2>
        <p className="text-gray-700 mb-6">
          Deevo may update these Terms of Service from time to time. We will
          notify you of significant changes via email or through our platform.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          9. Contact Us
        </h2>
        <p className="text-gray-700">
          If you have any questions about these Terms of Service, contact us.
        </p>
      </div>
      {/* Footer */}
      <footer className="py-6 pb-10 bg-[#202020] text-white">
        <div className="max-w-4xl justify-between mx-auto px-6 text-center flex flex-col sm:flex-row ">
          <div className="flex flex-col text-left">
            <p className="text-xl sm:text-2xl italic">Deevo</p>
            <p className="text-sm">
              &copy; Copyright 2025. All rights reserved.{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 flex-col text-sm text-left sm:text-right mt-5 sm:mt-0 gap-16 gap-y-3">
            <span
              onClick={openContact}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Contact Us
            </span>
            <span
              onClick={setShowLogin}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Log In
            </span>
            <span
              onClick={() => {
                navigate("/credits");
              }}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Credits
            </span>
            <span
              onClick={() => {
                navigate("/soundwaves");
              }}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Soundwaves
            </span>
            <span
              onClick={() => {
                window.open("/privacy-policy", "_blank");
              }}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Privacy Policy
            </span>
            <span
              onClick={() => {
                window.open("/terms-of-service", "_blank");
              }}
              className="underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
