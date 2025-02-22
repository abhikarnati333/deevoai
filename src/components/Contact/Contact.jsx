import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

const Contact = ({ isOpen, closeMenu }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { backendUrl } = useContext(Context);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {email, subject, message}
    try {
      const response = await axios.post(`${backendUrl}/api/user/contact-message`, contactData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        toast.success("Thank you for your message! We'll reach out to you if need be.");
        setEmail("");
        setSubject("");
        setMessage("");
        closeMenu()
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div
      onClick={closeMenu}
      className="fixed w-full h-full flex justify-center items-center pointer-events-auto z-[1000] left-0 top-0 bg-black/50 overflow-y-scroll"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed w-[95vw] sm:max-w-[900px] h-auto max-h-[80vh] overflow-y-scroll p-5 rounded-[20px] bg-white"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl">Contact Us</h1>
          <button
            aria-label="Close"
            onClick={closeMenu}
            className="text-lg text-[#202020] hover:opacity-65"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-500 mb-4">Reach out to the Deevo team here!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Subject"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <textarea
              id="message"
              placeholder="Your Questions, Comments, Concerns..."
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={closeMenu}
              className="px-4 py-2 border border-[#222]/10  rounded-md hover:opacity-65"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#020202] text-white rounded-md hover:opacity-65"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
