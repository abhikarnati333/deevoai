import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedSongs, setSelectedSongs] = useState(() => {
        const savedSongs = localStorage.getItem('selectedSongs');
        return savedSongs ? JSON.parse(savedSongs) : [];
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        localStorage.setItem('selectedSongs', JSON.stringify(selectedSongs));
    }, [selectedSongs]);


    const navigate = useNavigate();

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData(""); // Clear previous data
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await generatePlaylist(prompt);
            setRecentPrompt(prompt); // Store the current prompt
        } else {
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input); // Store the current input
            response = await generatePlaylist(input);
        }
        console.log("Generated playlist response:", response);
        setResultData(response); // Update resultData
        setLoading(false);
        setInput("");
    };
    
    const regenerate = async () => {
        setIsVisible(false); // Hide the button after click
        setResultData(""); // Clear previous data
        setLoading(true);
        setShowResult(true);

        let response;
        if (recentPrompt) {
            response = await reGeneratePlaylist(recentPrompt);
        } else {
            console.error("No recent prompt available for regeneration.");
            setLoading(false);
            setIsVisible(true); // Show button again if there's an error
            return;
        }

        console.log("Regenerated playlist response:", response);
        setResultData(response); // Update resultData
        setLoading(false);
    };
    


    const generatePlaylist = async (prompt) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/playlist/generate-playlist',
                { prompt },
                { headers: { token } }
            );

            if (data.success) {
                loadCreditsData();
                return data.playlist; // Return the playlist string here
            } else {
                toast.error(data.message);
                loadCreditsData();
                if (data.creditBalance === 0) {
                    navigate('/credits');
                }
            }
        } catch (error) {
            console.error("Error in generatePlaylist:", error);
            toast.error(error.message);
        }
    };

    const reGeneratePlaylist = async (prompt) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/playlist/regenerate-playlist',
                { prompt },
                { headers: { token } }
            );

            if (data.success) {
                loadCreditsData();
                return data.playlist; // Return the playlist string here
            } else {
                toast.error(data.message);
                loadCreditsData();
                if (data.creditBalance === 0) {
                    navigate('/credits');
                }
            }
        } catch (error) {
            console.error("Error in reGeneratePlaylist:", error);
            toast.error(error.message);
        }
    }

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } });

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        navigate('/login');
        toast.success("LOGGED OUT SUCCESSFULLY");
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        user,
        setUser,
        showLogin,
        setShowLogin,
        navigate,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generatePlaylist,
        reGeneratePlaylist,
        regenerate,
        isVisible,
        setIsVisible,
        selectedSongs,
        setSelectedSongs,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
