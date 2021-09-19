import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect, useState } from "react";

import CurrentPlaylist from './CurrentPlaylist';
import Login from './Login';
import SpotifyPlayerContainer from '../SpotifyPlayerContainer';
import NewPlaylist from '../NewPlaylist/NewPlaylist';
import RecommendedPlaylist from '../RecommendedPlaylist/RecommendedPlaylist';
import SidebarHeader from '../Sidebar/SidebarHeader';
import SearchForSongs from '../search/SearchForSongs'

function App() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const parsedHash = new URLSearchParams(
      window.location.hash.substr(1)).get("access_token");

    if(parsedHash) {
      setSpotifyAccessToken(parsedHash);
      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(parsedHash);

      window.history.pushState({}, null, '/')
      
      const details = { time_range: "short_term"}
      spotifyApi.getMyTopTracks(details).then(function (data) {
        setTopTracks(data.items);
      },
      function (err) {
        console.error(err);
      }
    );
    }
  }, []);

  // useEffect(() => {
  // }, [currentPlayingSong])

  const removeRecommendedTrack = (id, e) => {
    e.stopPropagation();
    const newRecommendedTracks = recommendedTracks.filter((track) => track.id !== id);
    setRecommendedTracks(newRecommendedTracks);
  }

  const showRecommended = () => {
    if (recommendedTracks.length > 0) return <RecommendedPlaylist setCurrentPlayingSong={setCurrentPlayingSong} recommendedTracks={recommendedTracks} spotifyAccessToken={spotifyAccessToken} removeTrack={removeRecommendedTrack}/>
    return null;
  }

  if(spotifyAccessToken) {
    return (
      <div className="App">
        <div id="sidebarDiv">
            <SidebarHeader />
          <div id="createNewPlaylist">
            <NewPlaylist accessToken={spotifyAccessToken} setCurrentPlayingSong={setCurrentPlayingSong} setRecommendedTracks={setRecommendedTracks}/>
          </div>
        </div>
        <div id="bodyDiv">
          <div id="usersCurrentPlaylist">
            <CurrentPlaylist trackList={topTracks} setCurrentPlayingSong={setCurrentPlayingSong}/>
          </div>
          <div id="searchForSongs">
            <SearchForSongs setCurrentPlayingSong={setCurrentPlayingSong}/>
          </div>
          <div id="recommendedPlaylist">
            {showRecommended()}
          </div>
          <div id="trackPlayingDiv">
            <SpotifyPlayerContainer accessToken={spotifyAccessToken} currentPlayingSong={currentPlayingSong} setCurrentPlayingSong={setCurrentPlayingSong}/>
          </div>
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
