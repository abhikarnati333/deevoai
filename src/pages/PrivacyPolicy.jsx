import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import Contact from "../components/Contact/Contact";
import { assets } from "../assets/assets";


const PrivacyPolicy = () => {
  const { navigate, setShowLogin, user } = useContext(Context);
  const [isContactOpen, setisContactOpen] = useState(false);
  const openContact = () => setisContactOpen(true);
  const closeContact = () => setisContactOpen(false);

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
      <div className="max-w-4xl mx-auto  p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-700 italic mb-6">Effective January 5th, 2025</p>
        <p className="text-gray-700 mb-6">
          At Deevo, we are committed to protecting your privacy. This document
          outlines how we handle your personal data when you use our services.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          1. Data We Collect
        </h2>
        <p className="text-gray-700 mb-6">
          - <strong>Personal Details:</strong> When signing up, we may gather
          your name, email, and other necessary information.
          <br />- <strong>Usage Information:</strong> We collect insights into
          your activity on our platform, such as playlist preferences,
          interactions, and session times.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          2. How We Use Collected Data
        </h2>
        <p className="text-gray-700 mb-6">
          We use your information to:
          <br />
          - Personalize your experience and generate unique playlists.
          <br />
          - Notify you about updates, offers, or technical issues.
          <br />- Enhance our platform through usage analysis.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          3. Sharing Your Information
        </h2>
        <p className="text-gray-700 mb-6">
          Deevo does not sell your personal data. We may share it only with:
          <br />
          - Trusted third-party services like Spotify to enable integrations.
          <br />- Authorities if legally required or to protect our platform's
          integrity.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          4. Keeping Your Data Safe
        </h2>
        <p className="text-gray-700 mb-6">
          We implement robust security measures to protect your data. However,
          no online platform is entirely secure. Please reach out if you detect
          any unauthorized access to your account.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          5. Your Rights
        </h2>
        <p className="text-gray-700 mb-6">
          You have the right to:
          <br />
          - Access and update your personal information.
          <br />
          - Request data deletion at any time.
          <br />- Unsubscribe from non-essential communications.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          6. Policy Updates
        </h2>
        <p className="text-gray-700 mb-6">
          We may revise this policy periodically. Any significant changes will
          be communicated through email or in-app notifications.
        </p>

        <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
          7. Get in Touch
        </h2>
        <p className="text-gray-700">
          For questions or concerns about this policy, contact us.
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

export default PrivacyPolicy;
