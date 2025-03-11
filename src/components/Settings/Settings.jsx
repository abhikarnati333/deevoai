import React, { useState, useContext } from "react";
import "./Settings.css";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import Contact from "../Contact/Contact";

const Settings = ({ isOpen, closeMenu }) => {
    const { navigate, logout, user, setShowLogin, newChat } = useContext(Context);
    const [isContactOpen, setisContactOpen] = useState(false);
    const openContact = () => setisContactOpen(true);
    const closeContact = () => setisContactOpen(false);

    if (!isOpen) return null;

    return (
        
        <div
            className="settings-overlay fixed w-full h-full flex justify-center items-center pointer-events-auto z-[1000] left-0 top-0 bg-black/50 overflow-y-scroll"
            onClick={closeMenu}
        >
            <Contact isOpen={isContactOpen} closeMenu={closeContact} />
            <div
                className="fixed w-[95vw] sm:max-w-[900px] h-auto max-h-[80vh] overflow-y-scroll p-5 rounded-[20px] bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl">Settings</h1>
                    <button
                        className="text-lg text-[#202020] hover:opacity-65"
                        onClick={closeMenu}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <li className="mb-5 flex items-center bg-[#f0f4f9] text-base text-[#202020] transition-[background-color] duration-[0.3s] p-2.5 rounded-lg ">
                    <img className="w-5 mr-2" src={assets.email_icon} alt="" />
                    <span>{user.email}</span>
                </li>

                <p className="lg:hidden text-[#202020] text-sm mt-[7px] mb-[5px]">General</p>
                <ul className="lg:hidden settings-list m-0 p-0">
                    <li onClick={() => {newChat(); closeMenu();}} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.chat_icon} alt="" />
                        <span>New Chat</span>
                    </li>
                    
                    <li onClick={() => {navigate('/credits'); closeMenu();}} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.upgrade_icon} alt="" />
                        <span>Buy Credits</span>
                    </li>

                    <li onClick={() => {navigate('/soundwaves'); closeMenu();}} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.community_icon} alt="" />
                        <span>Soundwaves</span>
                    </li>

                </ul>
                <p className="text-[#202020] text-sm mt-[7px] mb-[5px]">Feedback</p>
                <ul className="settings-list m-0 p-0">
                    <li onClick={openContact} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.contact_icon} alt="" />
                        <span>Contact</span>
                    </li>
                    <li className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.newsletter_icon} alt="" />
                        <span>Newsletter</span>
                    </li>
                </ul>
                <p className="text-[#202020] text-sm mt-[7px] mb-[5px]">About</p>
                <ul className="settings-list m-0 p-0">
                    <li onClick={() => {window.open('/terms-of-service', '_blank'); closeMenu();}} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.tof_icon} alt="" />
                        <span>Terms of Service</span>
                    </li>
                    <li onClick={() => {window.open('/privacy-policy', '_blank'); closeMenu();}} className="flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                        <img className="w-5 mr-2" src={assets.privacypolicy_icon} alt="" />
                        <span>Privacy Policy</span>
                    </li>
                    <li className="flex items-center bg-[#f0f4f9] text-base text-[#202020] transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg">
                        <img className="w-5 mr-2" src={assets.version_icon} alt="" /> 
                        <span>Deevo Version 1.1.0</span>
                    </li>
                </ul>
                { user ?
                <li onClick={()=> {logout(); closeMenu();}} className="mt-10 flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                    <img className="w-5 mr-2" src={assets.logout_icon} alt="" />
                    <span>Logout</span>
                </li>

                :
                <li onClick={()=> {setShowLogin(true); closeMenu();}} className="mt-10 flex items-center bg-[#f0f4f9] text-base text-[#202020] cursor-pointer transition-[background-color] duration-[0.3s] mb-2 p-2.5 rounded-lg hover:bg-[#dfe4ea]">
                    <img className="w-5 mr-2" src={assets.login_icon} alt="" />
                    <span>Login</span>
                </li>
                }
            </div>
        </div>
    );
};

export default Settings;
