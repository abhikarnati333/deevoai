import React, { useState } from 'react';
import "./AdvancedOptions.css";

const AdvancedOptions = ({ isOpen, closeMenu }) => {
  const [activeTab, setActiveTab] = useState("Artist"); // State for active tab
  const [selectedArtists, setSelectedArtists] = useState([]); // State to store selected artists
  const [selectedGenres, setSelectedGenres] = useState([]); // State to store selected genres
  const [artistInput, setArtistInput] = useState(""); // State for artist input
  const [selectedArtistsString, setSelectedArtistsString] = useState(""); // State for concatenated artists string
  const [selectedGenresString, setSelectedGenresString] = useState(""); // State for concatenated genres string

  if (!isOpen) return null;

  // Update and log the artists string
  const updateArtistsString = (artists) => {
    const artistsString = artists.join(", ");
    setSelectedArtistsString(artistsString);
    console.log(`Selected Artists: ${artistsString}`);
  };

  // Update and log the genres string
  const updateGenresString = (genres) => {
    const genresString = genres.join(", ");
    setSelectedGenresString(genresString);
    console.log(`Selected Genres: ${genresString}`);
  };

  // Add artist to the selected list
  const handleArtistClick = (artist) => {
    if (!selectedArtists.includes(artist)) {
      const updatedArtists = [...selectedArtists, artist];
      setSelectedArtists(updatedArtists);
      updateArtistsString(updatedArtists);
    }
  };

  // Remove artist from the selected list
  const handleRemoveArtist = (artist) => {
    const updatedArtists = selectedArtists.filter((a) => a !== artist);
    setSelectedArtists(updatedArtists);
    updateArtistsString(updatedArtists);
  };

  // Add genre to the selected list
  const handleGenreClick = (genre) => {
    if (!selectedGenres.includes(genre)) {
      const updatedGenres = [...selectedGenres, genre];
      setSelectedGenres(updatedGenres);
      updateGenresString(updatedGenres);
    }
  };

  // Remove genre from the selected list
  const handleRemoveGenre = (genre) => {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    updateGenresString(updatedGenres);
  };

  // Add artist from input
  const addArtistFromInput = () => {
    if (artistInput.trim() && !selectedArtists.includes(artistInput)) {
      const updatedArtists = [...selectedArtists, artistInput];
      setSelectedArtists(updatedArtists);
      updateArtistsString(updatedArtists);
      setArtistInput(""); // Clear input field
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
          <h1 className="text-xl">Advanced Options</h1>
          <button
            aria-label="Close"
            onClick={closeMenu}
            className="text-lg text-[#202020] hover:opacity-65"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("Artist")}
            className={`px-4 py-2 text-sm ${
              activeTab === "Artist" ? "bg-[#f0f4f9] rounded-[50px] px-6" : "text-[#202020]"
            }`}
          >
            Artist
          </button>
          <button
            onClick={() => setActiveTab("Genre")}
            className={`px-4 py-2 text-sm ${
              activeTab === "Genre" ? "bg-[#f0f4f9] rounded-[50px] px-6" : "text-[#202020]"
            }`}
          >
            Genre
          </button>
        </div>

        <div className="border-t mb-4"></div>

        {/* Tab Content */}
        <div>
          {activeTab === "Artist" && (
            <div>
              <label htmlFor="artist-input" className="block mb-2 text-gray-700">
                Add Your Favorite Artist
              </label>
              <div className="flex items-center gap-2 mb-4">
                <input
                  id="artist-input"
                  type="text"
                  value={artistInput}
                  onChange={(e) => setArtistInput(e.target.value)}
                  placeholder="Type artist name..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={addArtistFromInput}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <div>
                <h2 className="mb-2 text-gray-700">Popular Artists</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["Travis Scott", "Drake", "Taylor Swift", "Bruno Mars", "SZA", "Bad Bunny", "The Weeknd", "Olivia Rodrigo"].map(
                    (artist) => (
                      <button
                        key={artist}
                        onClick={() => handleArtistClick(artist)}
                        className="px-4 py-2 border border-gray-300 rounded-[50px] hover:bg-[#f0f4f9]"
                      >
                        {artist}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Genre" && (
            <div>
              <h2 className="mb-4 text-gray-700">Select Your Favorite Genres</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "EDM", "R&B", "Country", "Reggae", "Blues"].map(
                  (genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreClick(genre)}
                      className="px-4 py-2 border border-gray-300 rounded-[50px] hover:bg-[#f0f4f9]"
                    >
                      {genre}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Display Selected Options */}
        <div className="mt-6">
          <h2 className="text-gray-700 mb-2">Selected Options:</h2>
          <div className="mb-2">
            <strong>Include Artist:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedArtists.map((artist) => (
                <span
                  key={artist}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full flex items-center gap-2"
                >
                  {artist}
                  <button
                    onClick={() => handleRemoveArtist(artist)}
                    className="text-[#202020] hover:opacity-65"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <strong>Include Genre:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full flex items-center gap-2"
                >
                  {genre}
                  <button
                    onClick={() => handleRemoveGenre(genre)}
                    className="text-[#202020] hover:opacity-65"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;
