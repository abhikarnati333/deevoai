import { useState, useContext, useEffect } from "react";
import Contact from "../components/Contact/Contact";
import { Context } from "../context/Context";
import { assets } from "../assets/assets";
import ReactGA from "react-ga4"

const Soundwaves = () => {
  const { navigate, setShowLogin, user } = useContext(Context);
  const [isContactOpen, setisContactOpen] = useState(false);
  const openContact = () => setisContactOpen(true);
  const closeContact = () => setisContactOpen(false);
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/soundwaves", title: "Soundwaves Page" })
  }, []);

  return (
    <div className="flex-1 min-h-screen relative">
      <Contact isOpen={isContactOpen} closeMenu={closeContact} />
      {/* Header Section */}
      <header className="sticky top-0 sm:top-5 px-5">
        <div className="flex justify-between items-center text-xl sm:text-2xl p-5 sm:p-3 px-5 text-[#202020] mx-auto sm:max-w-5xl sm:border sm:border-[#222]/10 sm:rounded-2xl bg-white">
          <div className="flex items-center">
            <p onClick={() => {navigate("/")}} className="italic cursor-pointer">Deevo</p>
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
                      className="w-9 items-center"
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

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl sm:text-4xl underline underline-offset-8 italic">
          Deevo Soundwaves
        </h1>
      </div>

      {/* Main Section */}
      <section>
        <div className="w-full h-full flex sm:flex-row flex-col items-center justify-center">
          {/* Image Section */}
          <div className="flex w-full h-[50vh] sm:h-[70vh] justify-center items-center p-5">
            <img
              className="w-[600px] rounded-xl"
              src={assets.gradient_image}
              alt=""
            />
          </div>

          {/* Text Section */}
          <div className="flex w-full h-[30vh] justify-center items-center p-5">
            <div className="w-full max-w-xl text-left">
              <p className="text-lg text-gray-500">The Deevo Team</p>
              <h1 className="text-4xl font-medium mt-3 italic">
                Introducing Deevo
              </h1>
              <p className="text-lg mt-3 text-gray-500">
                Full Article Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>

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

export default Soundwaves;
