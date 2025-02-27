import React, { useContext, useState } from "react";
import './Sidebar.css';
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Settings from "../Settings/Settings";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // State to toggle settings

  const handleMouseEnter = () => {
    setExtended(true);
  };

  const handleMouseLeave = () => {
    setExtended(false);
  };

  const { onSent, prevPrompts, setRecentPrompt, navigate, user, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Text Copied to Clipboard');
      })
      .catch(err => {
        toast.error('Error copying text: ', err);
      });
  };

  return (
    <>
      <div 
        className={`sidebar ${extended ? 'extended' : ''}`} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="top">
          {extended && (
            <div onClick={() => navigate('/')} className="sidebar-title">
              <p className="italic">Deevo</p>
            </div>
          )}
          {extended && (
            <div className="recent">
              <p className="recent-title">Recent Playlists</p>
              {prevPrompts.map((item, index) => (
              <div id="recent-entry" key={index} onClick={() => copyToClipboard(item)} className="recent-entry">
                <img src={assets.chat_icon} alt="Message Icon" />
                <p>{item.slice(0, 15)}...</p>
                <Tooltip anchorSelect="#recent-entry" content="Copy Prompt"/>
              </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="bottom">
          <div onClick={() => newChat()} className="bottom-item recent-entry">
            <img src={assets.chat_icon} alt="Settings Icon" />
            {extended ? <p>New Chat</p> : null}
          </div>
          <div onClick={() => navigate('/credits')} className="bottom-item recent-entry">
            <img src={assets.upgrade_icon} alt="Help Icon" />
            {extended ? <p>Buy Credits</p> : null}
          </div>
          <div onClick={() => navigate('/soundwaves')} className="bottom-item recent-entry">
            <img src={assets.community_icon} alt="Community Icon" />
            {extended ? <p>Soundwaves</p> : null}
          </div>
          <div onClick={openSettings} className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="Settings Icon" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
      </div>

      <Settings isOpen={showSettings} closeMenu={closeSettings} />
    </>
  );
};

export default Sidebar;
