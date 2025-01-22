import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { getSpotifyToken } from '../../config/spotifyAuth';
import './Result.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Result = () => {
  const { resultData, selectedSongs, setSelectedSongs } = useContext(Context); // Use context for selectedSongs
  const [songDetails, setSongDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resultData) {
      searchSongs(resultData);
    }
  }, [resultData]);

  const searchSongs = async (searchQuery) => {
    try {
      setLoading(true);
      const token = await getSpotifyToken();
      const songList = parseInput(searchQuery);

      const results = await Promise.all(
        songList.map(async (song) => {
          const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              q: `${song.title} ${song.artist}`,
              type: 'track',
              limit: 1,
            },
          });
          

          const track = response.data.tracks.items[0];
          return {
            id: track.id,
            name: track.name,
            artist: track.artists.map((artist) => artist.name).join(', '),
            albumCover: track.album.images[0]?.url || '', // Fallback if no image
          };
        })
      );

      setSongDetails(results);
      setSelectedSongs(results); // Default all songs selected
    } catch (error) {
      console.error('Error fetching song details:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseInput = (input) => {
    const regex = /"(.*?)"\s*-\s*(.*?)(?=\n|$)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
      matches.push({
        title: match[1].trim(),
        artist: match[2].trim(),
      });
    }

    return matches;
  };

  const toggleSelection = (song) => {
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.find((selectedSong) => selectedSong.id === song.id)
        ? prevSelectedSongs.filter((selectedSong) => selectedSong.id !== song.id)
        : [...prevSelectedSongs, song]
    );
  };

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {songDetails.length > 0 && (
        <>
          <div className="flex flex-col gap-5 animate-[fadeIn_1.5s]">
            {songDetails.map((song) => (
              <div
                key={song.id}
                className={`flex items-center gap-[15px] p-2.5 rounded-[10px] cursor-pointer relative w-full ${
                  selectedSongs.find((selectedSong) => selectedSong.id === song.id)
                    ? 'bg-[#f0f4f9]'
                    : 'bg-[#f0f4f9] opacity-50'
                }`}
                onClick={() => toggleSelection(song)}
              >
                <img
                  className="w-[75px] h-[75px] rounded-lg"
                  src={song.albumCover}
                  alt={`${song.name} album cover`}
                />
                <div className="flex flex-col">
                  <h3 className="m-0 text-[#202020]">{song.name}</h3>
                  <p className="text-gray-500 mt-[5px] mb-0 mx-0 italic">{song.artist}</p>
                </div>
                {selectedSongs.find((selectedSong) => selectedSong.id === song.id) && (
                  <div className="absolute bottom-2 right-2 p-1 bg-white rounded-full">
                    <img className="w-5" src={assets.check_icon} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="opacity-70 text-center m-3">
            <h2>
              {selectedSongs.length} / {songDetails.length} Songs Selected
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
