import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Result from "../Result/Result";
import Settings from "../Settings/Settings";
import AdvancedOptions from "../AdvancedOptions/AdvancedOptions";
import Contact from "../Contact/Contact";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, user, setShowLogin, navigate, credit, regenerate, isVisible } = useContext(Context);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            onSent();
        }
    };

    const [isCardModalOpen, setisCardModalOpen] = useState(false);
    const [isSettingsOpen, setisSettingsOpen] = useState(false);
    const [isAdvancedOptionsOpen, setisAdvancedOptionsOpen] = useState(false);
    const [isContactOpen, setisContactOpen] = useState(false);

    const openCardModal = () => setisCardModalOpen(true);
    const closeCardModal = () => setisCardModalOpen(false);

    const openSettingsMenu = () => setisSettingsOpen(true);
    const closeSettingsMenu = () => setisSettingsOpen(false);

    const openAdvancedOptions = () => setisAdvancedOptionsOpen(true);
    const closeAdvancedOptions = () => setisAdvancedOptionsOpen(false);

    const openContact = () => setisContactOpen(true);
    const closeContact = () => setisContactOpen(false);

    const handleCardClick = (text) => {
        setInput(text);
        closeCardModal();
    };


    return (
        <div className="flex-1 min-h-screen relative">
            <Settings isOpen={isSettingsOpen} closeMenu={closeSettingsMenu} />
            <Contact isOpen={isContactOpen} closeMenu={closeContact} />
            <div className="z-50 flex justify-between items-center text-xl sm:text-2xl p-[22px] text-[#202020]">
                <div className="flex items-center">
                    {/* <img className="h-[25px] w-[25px] mr-[7px] cursor-pointer lg:hidden hover:opacity-65"  src={assets.menu_icon} alt="Menu Icon" /> */}
                    <p onClick={() => {navigate("/")}} className="italic cursor-pointer">Deevo</p>    
                </div>
                {
                user ?
                <div className="flex items-center gap-2 sm:gap-3">
                    <button 
                        onClick={() => navigate('/credits')} 
                        className="flex items-center gap-2 bg-[#f0f4f9] px-5 py-1 text-lg rounded-full hover:opacity-65"
                    >
                        <img className=" w-5 " src={assets.upgrade_icon} alt="" />
                        <p>Credits Left: {credit}</p>
                    </button>
                    <div className="relative cursor-pointer hover:opacity-65">
                        <img onClick={openSettingsMenu} className="w-9 sm:w-10" src={assets.account_icon} alt="" />
                    </div>
                    
                </div> 
                :
                <div className="flex items-center gap-2 sm:gap-4 ">
                    <button onClick={()=>setShowLogin(true)} className="bg-[#202020] text-white px-7 py-1 rounded-full text-lg hover:opacity-65">Log in</button>
                    {/* <button onClick={()=>setShowLogin("Sign Up")} className="bg-[#f0f4f9] text-[#202020] px-7 py-1 rounded-full text-lg hover:opacity-65">Sign Up</button> */}
                </div>
                }
                

                
            </div>

            <div className="max-w-[900px] m-auto">
                {!showResult ? (
                    <>
                        <div className="text-[#202020] mx-0 my-10 p-5 text-4xl sm:text-6xl">
                            <p className="mb-2 sm:mb-5">
                                Hey, Friend
                            </p>
                            <p>What are you feeling today?</p>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 p-5">
                            <div className="h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("A Late Night Drive In The Rain")}>
                                <p className="text-[#202020] text-[17px]">A Late Night Drive In The Rain</p>
                            </div>
                            <div className="h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("A Romantic Dinner Under the Stars")}>
                                <p className="text-[#202020] text-[17px]">A Romantic Dinner Under the Stars</p>
                            </div>
                            <div className="h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb] hidden sm:block" onClick={() => handleCardClick("A Nostalgic Trip Down Memory Lane")}>
                                <p className="text-[#202020] text-[17px]">A Nostalgic Trip Down Memory Lane</p>
                            </div>
                            <div className="h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb] hidden sm:block" onClick={() => handleCardClick("An Intense Workout Session with Rap")}>
                                <p className="text-[#202020] text-[17px]">An Intense Workout Session with Rap</p>
                            </div>
                        </div>
                        <div>
                            <button className="pr-5 pb-5 mb-10 underline underline-offset-2 cursor-pointer float-right hover:opacity-65" onClick={openCardModal}>+ More Suggestions</button>

                            {isCardModalOpen && (
                                <div className="cardModal-overlay fixed w-full h-full flex justify-center items-center pointer-events-auto z-[1000] left-0 top-0 bg-black/50 " onClick={closeCardModal}>
                                    <div
                                        className={`fixed w-[95vw] max-w-[900px] h-auto max-h-[80vh] overflow-y-scroll p-5 rounded-[20px] bg-white ${isCardModalOpen ? "bottom-auto" : ""}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h1 className="text-xl">Make a playlist for...</h1>
                                            <button
                                                className="text-lg text-[#202020] hover:opacity-65"
                                                onClick={closeCardModal}
                                                aria-label="Close"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className=" grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5 p-5 animate-[fadeIn_1.5s]">
                                            <div className="card h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("Dance Party in My Living Room")}>
                                                <p className="text-[#202020] text-[17px]">A Dance Party in My Living Room</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("For a Late-Night Study Session")}>
                                                <p className="text-[#202020] text-[17px]">A Late-Night Study Session</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("Chilling by the Beach with Friends")}>
                                                <p className="text-[#202020] text-[17px]">Chilling by the Beach with Friends</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("An Epic Road Trip")}>
                                                <p className="text-[#202020] text-[17px]">An Epic Road Trip</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("Unwinding After a Long Day")}>
                                                <p className="text-[#202020] text-[17px]">Unwinding After a Long Day</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("Creative Flow and Inspiration")}>
                                                <p className="text-[#202020] text-[17px]">Creative Flow and Inspiration</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("Celebrating Life’s Small Wins")}>
                                                <p className="text-[#202020] text-[17px]">Celebrating Life’s Small Wins</p>
                                            </div>
                                            <div className=" h-auto p-[15px] bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#e2e6eb]" onClick={() => handleCardClick("A Cozy Evening by the Fireplace")}>
                                                <p className="text-[#202020] text-[17px]">A Cozy Evening by the Fireplace</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                        <div className=" search-box fixed bottom-0 w-full max-w-[900px] mx-auto my-[15px] px-5 py-0">
                            {user ? 
                            <div className=" flex items-center justify-between gap-5 bg-[#f0f4f9] px-5 py-2 sm:py-2.5 rounded-full ">

                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    type="text"
                                    placeholder="Make a playlist for..."
                                    className="flex-none bg-transparent text-md sm:text-lg p-2 border-[none] outline-[none] w-[52vw] sm:w-auto sm:flex-1"
                                />
                                <div className="flex flex-row gap-1">
                                    <img id="advanced-options" onClick={() => toast.info("Advanced Options Available Soon")} className="w-10 sm:w-11 p-2  flex items-center justify-center cursor-pointer hover:opacity-65" src={assets.customize_icon} alt="" />
                                    <Tooltip anchorSelect="#advanced-options" content="Advanced Options"/>
                                    {input ? <img className="w-10 sm:w-11 p-2 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-65" onClick={() => onSent()} src={assets.send_arrow} alt="" /> : null}
                                </div>

                                <AdvancedOptions isOpen={isAdvancedOptionsOpen} closeMenu={closeAdvancedOptions} />
                            </div>
                            :
                            <div className=" flex items-center justify-between gap-5 bg-[#f0f4f9] px-5 py-2 sm:py-2.5 rounded-full ">
                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    type="text"
                                    placeholder="Make a playlist for..."
                                    className="flex-none bg-transparent text-md sm:text-lg p-2 border-[none] outline-[none]  w-[60vw] sm:w-auto sm:flex-1"
                                />
                                <div>{input ? <img className="w-10 sm:w-11 p-2 bg-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-65" onClick={()=>setShowLogin(true)} src={assets.send_arrow} alt="" /> : null}</div>
                            </div>}
                            <p className="hidden sm:block text-[10px] sm:text-[13px] text-center mt-[12px]">
                                We're continuously making improvements. Share any <a className="underline cursor-pointer underline-offset-2 hover:opacity-65" onClick={openContact}>feedback or suggestions</a> to help enhance your
                                experience.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="result">
                            <div className="result-title ">
                                <p>{recentPrompt}</p>
                            </div>


                            <div className="result-data">
                                {loading ? (
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                ) : (
                                    <Result resultData={resultData} />
                                )}
                            </div>
                        </div>
                        {
                        user && resultData ?
                        <div className="fixed left-1/2 transform -translate-x-1/2 max-w-[900px] flex flex-col bottom-0 w-full mx-auto my-[15px] px-5 py-0 justify-center items-center">
                            <div className="w-full flex flex-row items-center gap-5 ">
                                <button
                                    onClick={() => navigate("/export")}
                                    className="flex max-w-[500px] items-center justify-center bg-[#1DB954] text-white rounded-[50px] w-full text-lg py-3 hover:opacity-65"
                                    >
                                    Export to Spotify
                                </button>
                                {isVisible && (
                                    <>
                                    <img
                                        id="regenerate"
                                        className="w-7 h-7 items-center cursor-pointer justify-center hover:opacity-65"
                                        src={assets.regenerate_icon}
                                        onClick={regenerate}
                                        alt="Regenerate"
                                    />
                                    <Tooltip anchorSelect="#regenerate" content="Regenerate Playlist" />
                                    </>
                                )}                                
                            </div>
                            <p className="hidden sm:block text-[10px] sm:text-[13px] text-center mt-[12px]">
                                We're continuously making improvements. Share any{" "}
                                <a
                                    className="underline cursor-pointer underline-offset-2 hover:opacity-65"
                                    onClick={openContact}
                                >
                                    feedback or suggestions
                                </a>{" "}
                                to help enhance your experience.
                            </p>
                        </div>



                        :
                        null
                        }   
                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
