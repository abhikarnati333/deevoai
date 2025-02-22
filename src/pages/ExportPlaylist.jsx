import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Settings from "../components/Settings/Settings";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = `${import.meta.env.VITE_FRONTEND_URL}/export`;
const SPACE_DELIMITER = "%20";
const SCOPES = ["playlist-modify-public", "playlist-modify-private"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  return paramsInUrl.reduce((accumulator, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});
};

const ExportToSpotify = () => {
  const { user, credit, selectedSongs, navigate, setShowLogin } =
    useContext(Context);

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [status, setStatus] = useState("Not logged in");
  const [isSettingsOpen, setisSettingsOpen] = useState(false);

  const openSettingsMenu = () => setisSettingsOpen(true);
  const closeSettingsMenu = () => setisSettingsOpen(false);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getReturnedParamsFromSpotifyAuth(
        window.location.hash
      );
      localStorage.setItem("access_token", access_token);
      setToken(access_token);
      fetchUserProfile(access_token);
    }
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const fetchUserProfile = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      setUserId(data.id);
      setStatus(`Logged in as ${data.display_name || "User"}`);
    } catch (error) {
      setStatus("Failed to fetch user profile.");
    }
  };

  const createPlaylist = async () => {
    if (!token || !userId) {
      toast.info("You must log in to create a playlist.");
      return;
    }
    if (!playlistName.trim()) {
      toast.info("Please enter a playlist name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "Crafted by deevoai.com",
            public: false,
          }),
        }
      );
      const playlistData = await response.json();
      if (response.ok) {
        setStatus(`Playlist created: ${playlistData.name}`);
        await addTracksToPlaylist(playlistData.id);
      } else {
        setStatus("Error creating playlist");
        toast.error("Error creating playlist. Try again later");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const addTracksToPlaylist = async (playlistId) => {
    if (!selectedSongs.length) {
      toast.info("No songs selected to add to the playlist.");
      return;
    }

    try {
      const trackUris = selectedSongs.map((song) => `spotify:track:${song.id}`);
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: trackUris }),
        }
      );

      if (response.ok) {
        setStatus("Tracks added to playlist successfully!");
        toast.success("Playlist Created Successfully!");
      } else {
        setStatus("Error adding tracks to playlist.");
        toast.error("Error adding tracks to playlist. Try again later");
      }
    } catch (error) {
      console.error("Error adding tracks:", error);
    }
  };

  return (
    <div className="flex-1 min-h-screen relative">
      {/* Header Section */}
      <div className="z-50 flex justify-between items-center text-xl sm:text-2xl p-[22px] text-[#202020]">
        <div className="flex items-center">
          {/* <img className="h-[25px] w-[25px] mr-[7px] cursor-pointer lg:hidden hover:opacity-65"  src={assets.menu_icon} alt="Menu Icon" /> */}
          <p onClick={() => {navigate("/")}} className="italic cursor-pointer">Deevo</p>
        </div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/credits")}
              className="flex items-center gap-2 bg-[#f0f4f9] px-5 py-1 text-lg rounded-full hover:opacity-65"
            >
              <img className="w-5" src={assets.upgrade_icon} alt="" />
              <p>Credits Left: {credit}</p>
            </button>
            <div className="relative cursor-pointer hover:opacity-65">
              <img
                onClick={openSettingsMenu}
                className="w-9 sm:w-10"
                src={assets.account_icon}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {setShowLogin(true); navigate('/')}}
              className="bg-[#202020] text-white px-7 py-1 rounded-full text-lg hover:opacity-65"
            >
              Get Started
            </button>
            {/* <button onClick={()=>setShowLogin("Sign Up")} className="bg-[#f0f4f9] text-[#202020] px-7 py-1 rounded-full text-lg hover:opacity-65">Sign Up</button> */}
          </div>
        )}

        <Settings isOpen={isSettingsOpen} closeMenu={closeSettingsMenu} />
      </div>

      {/* Main Content Section */}
      {user ?
      <div className="flex items-center justify-center p-5 min-h-[calc(100vh-150px)]">
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-[900px] items-center">
          <div className="flex flex-col lg:w-2/3 w-full p-6">
            <h1 className="text-3xl sm:text-4xl font-medium mb-4 text-[#202020]">
              Export Playlist
            </h1>
            <p className="text-sm sm:text-base text-[#202020] mb-5">
              Status: {status}
            </p>
            {!token ? (
              <button
                onClick={handleLogin}
                className="px-6 py-2 text-lg bg-green-500 text-white rounded-full hover:opacity-65"
              >
                Log in to Spotify
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                />
                <button
                  onClick={createPlaylist}
                  className="w-full px-4 py-2 text-lg bg-blue-500 text-white rounded-full hover:opacity-65"
                >
                  Create Playlist
                </button>
              </>
            )}
          </div>
          <div className="fixed left-1/2 transform -translate-x-1/2 max-w-[900px] flex flex-col bottom-0 w-full mx-auto my-[15px] px-5 py-0 justify-center items-center">
            <button
              onClick={() => navigate("/")}
              className="flex max-w-[500px] items-center justify-center bg-[#f0f4f9] rounded-[50px] w-full text-lg py-3 hover:opacity-65"
            >
              Create another playlist
            </button>
            <p className="hidden sm:block text-[10px] sm:text-[13px] text-center mt-[12px]">
              We're continuously making improvements. Share any{" "}
              <a
                className="underline underline-offset-2 hover:opacity-65"
                href=""
              >
                feedback or suggestions
              </a>{" "}
              to help enhance your experience.
            </p>
          </div>
        </div>
      </div>
      :
      <div className="flex mt-10 items-center justify-center text-lg">
        <p>Please <button onClick={() => {setShowLogin(true); navigate('/')}} className="underline underline-offset-2">log in</button> to create a playlist.</p>
      </div>
      }
  
    </div>
  );
};

export default ExportToSpotify;
