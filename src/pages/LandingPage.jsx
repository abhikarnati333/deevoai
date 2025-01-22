import React, { useContext, useState } from "react";
import { assets, faq, plans } from "../assets/assets";
import { Context } from "../context/Context";

const LandingPage = () => {
  const { navigate, setShowLogin } = useContext(Context);

  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(0);

  // Toggle FAQ visibility
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="flex-1 min-h-screen relative">
      {/* Header Section */}
      <header className="sticky top-0 bg-white rounded-b-xl">
        <div className="flex justify-between items-center text-xl sm:text-2xl p-5 sm:p-7 text-[#202020]">
          <div className="flex items-center">
            <p className="italic">Deevo</p>
          </div>
          <div className="flex gap-10">
            <div className="hidden sm:block items-center gap-2 sm:gap-4">
              <a href="#features" className="text-lg hover:opacity-65">Features</a>
            </div>
            <div className="hidden sm:block items-center gap-2 sm:gap-4">
              <a href="#credits" className="text-lg hover:opacity-65">Credits</a>
            </div>
            <div className="hidden sm:block items-center gap-2 sm:gap-4">
              <a href="#faq" className="text-lg hover:opacity-65">FAQ</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={()=>setShowLogin(true)} className="bg-[#202020] text-white px-7 py-1 rounded-full text-lg hover:opacity-65">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <section>
        <div className="w-full h-full flex sm:flex-row flex-col items-center justify-center">
          <div className="flex w-full h-[70vh] md:h-[85vh] justify-center items-center p-5">
            <div className="w-full max-w-xl">
              <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg">
                Version 1.0.1 is here
              </div>
              <h1 className="text-5xl font-medium mt-6">
                Perfect Soundtrack, Tailored to You
              </h1>
              <p className="text-xl mt-6">
                Deevo uses advanced AI to curate music playlists tailored to
                your mood and preferences, giving you the ultimate personalized
                listening experience every time.
              </p>
              <div className="flex gap-3 items-center mt-[30px]">
                <button onClick={()=>setShowLogin(true)} className="bg-[#202020] text-white px-7 py-2 rounded-lg text-md sm:text-lg hover:opacity-65">
                  Get Started
                </button>
                <div className="flex items-center gap-2 border border-[#222]/10 rounded-full px-5 py-2 hover:opacity-65 cursor-pointer">
                  <a className="ml-2 text-md sm:text-lg" href="#features">
                    Learn More
                  </a>
                  <img className="w-5 h-5" src={assets.arrowdown_icon} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[70vh] md:h-[85vh] justify-center items-center p-5">
            <img className="w-[500px]" src={assets.mockup2} alt="" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#202020]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl text-white font-medium mb-10">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#303033] p-6 rounded-lg">
              <h4 className="text-xl text-white font-medium mb-4">
                AI-Powered Recommendations
              </h4>
              <p className="text-white">
                Get playlists tailored to your mood and preferences with Deevo's
                smart AI.
              </p>
            </div>
            <div className="bg-[#303033] p-6 rounded-lg">
              <h4 className="text-xl text-white font-medium mb-4">
                Seamless Spotify Integration
              </h4>
              <p className="text-white">
                Love a playlist? Export it directly to Spotify in just one
                click.
              </p>
            </div>
            <div className="bg-[#303033] p-6 rounded-lg">
              <h4 className="text-xl text-white font-medium mb-4">
                Activity-Focused Soundtracks
              </h4>
              <p className="text-white">
                Get tailored soundtracks for every activity, whether you're
                working out or just relaxing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section id="credits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-medium mb-10">Credits</h3>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
            {plans.map((item, index) => (
              <div
                key={index}
                className="bg-[#f0f4f9] flex flex-col justify-between rounded-lg p-6 transition duration-200"
              >
                <p className="text-lg font-medium text-[#202020]">{item.id}</p>
                <p className="mt-3 text-gray-600">
                  <span className="text-4xl text-[#202020]">${item.price}</span>
                  <span className="text-lg "> / {item.credits} credits</span>
                </p>
                <p className="text-md mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#202020]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl text-white font-medium mb-10">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 gap-8">
            {faq.map((faq, index) => (
              <div
                key={index}
                className="bg-[#303033] p-6 rounded-lg text-left"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xl text-white font-medium mb-4">
                    {faq.question}
                  </h4>
                  <img
                    className="w-6 cursor-pointer hover:opacity-65"
                    onClick={() => toggleFAQ(index)}
                    src={assets.arrowdownwhite_icon}
                    alt="Toggle FAQ"
                  />
                </div>
                {openFAQ === index && (
                  <p className="text-left text-white">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTO Section */}
      <section>
        <div className="w-full h-full flex sm:flex-row flex-col-reverse items-center justify-center">
          {/* Image Section */}
          <div className="hidden md:flex w-full h-[80vh] justify-center items-center p-5 pr-0">
            <img
              className="rounded-lg w-[700px] items-center"
              src={assets.mockup3}
              alt="Mockup Image"
            />
          </div>

          {/* Text Section */}
          <div className="flex w-full h-[60vh] md:h-[80vh] justify-center items-center p-5">
            <div className="w-full max-w-xl text-center sm:text-left">
              <h1 className="text-5xl font-medium mt-6">
                Your Thoughts, Your Playlist
              </h1>
              <p className="text-xl mt-6">
                Simply enter a prompt, and Deevo will instantly create a
                personalized music playlist tailored to your vibe
              </p>
              <div className="flex gap-1 items-center mt-[30px] justify-center sm:justify-start">
                <button onClick={()=>setShowLogin(true)} className="bg-[#202020] text-white px-7 py-2 rounded-lg text-lg hover:opacity-65">
                  Start Crafting
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#202020] py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-white flex flex-col">
          <p>&copy; Copyright 2025. All rights reserved. </p>
          <div>
            <span
              onClick={() => {
                window.open("/privacy-policy", "_blank");
              }}
              className="ml-5 underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Privacy Policy
            </span>
            <span
              onClick={() => {
                window.open("/terms-of-service", "_blank");
              }}
              className="ml-5 underline underline-offset-2 cursor-pointer hover:opacity-65"
            >
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
