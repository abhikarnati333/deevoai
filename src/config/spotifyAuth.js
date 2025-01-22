import axios from 'axios';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; 
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const getSpotifyToken = async () => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const response = await axios.post(tokenUrl, new URLSearchParams({
    grant_type: 'client_credentials',
  }), {
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};


