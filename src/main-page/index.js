import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect, useState } from "react";

import CurrentPlaylist from './CurrentPlaylist';
import Login from './Login';
import SpotifyPlayerContainer from '../SpotifyPlayerContainer';
import NewPlaylist from '../NewPlaylist/NewPlaylist';

function App() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);

  useEffect(() => {
    const parsedHash = new URLSearchParams(
      window.location.hash.substr(1)).get("access_token");
    // console.log("hi!", parsedHash)

    if(parsedHash) {
      setSpotifyAccessToken(parsedHash);
      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(parsedHash);

      window.history.pushState({}, null, '/')
      
      const details = { time_range: "short_term"}
      spotifyApi.getMyTopTracks(details).then(function (data) {
        console.log('Top tracks', data);
        setTopTracks(data.items);
      },
      function (err) {
        console.error(err);
      }
    );
    }
  }, []);

  if(spotifyAccessToken) {
    return (
      <div className="App">
        <header>
        </header>
        <main>
          <div id="usersCurrentPlaylist">
            <CurrentPlaylist trackList={topTracks} setCurrentPlayingSong={setCurrentPlayingSong}/>
          </div>
          <div id="createNewPlaylist">
            <NewPlaylist accessToken={spotifyAccessToken} setCurrentPlayingSong={setCurrentPlayingSong}/>
          </div>
        </main>
        <div className="trackPlayingDiv">
          <SpotifyPlayerContainer accessToken={spotifyAccessToken} currentPlayingSong={currentPlayingSong} setCurrentPlayingSong={setCurrentPlayingSong}/>
        </div>
      </div>
    );
  } else {
    return (
      <Login />
    )
  }

}

export default App;
