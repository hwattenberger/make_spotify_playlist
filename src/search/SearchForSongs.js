import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import Track from "../tracks/Track";
import { useState } from "react";

const SearchForSongs = ({setCurrentPlayingSong, spotifyAccessToken}) => {
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [trackSearch, setTrackSearch] = useState("");
    const [artistSearch, setArtistSearch] = useState("");
    const [hide, setHide] = useState(false);
    const spotifyApi = new SpotifyWebApi();

    const getTracks = (e) => {
        e.preventDefault();


        spotifyApi.setAccessToken(spotifyAccessToken);
        spotifyApi.searchTracks(trackSearch).then(function (data) {
            setSearchedTracks(data.tracks.items);
            setTrackSearch("");
        },
        function (err) {
            console.error(err);
        }
        );
    }

    const getTrackByArtist = (e) => {
        e.preventDefault();

        spotifyApi.search(`artist:${artistSearch}`, ["track"]).then(function (data) {
            setSearchedTracks(data.tracks.items);
            setArtistSearch("");
        },
        function (err) {
            console.error(err);
        }
        );
    }

    const handleChangeTrack = (e) => {
        setTrackSearch(e.target.value);
    }

    const handleChangeArtist = (e) => {
        setArtistSearch(e.target.value);
    }

    const toggleHidden = () => {
        setHide(!hide);
    }

    const trackLists = searchedTracks.map(track => 
        <li key={track.id}>
            <Track track={track} setCurrentPlayingSong={setCurrentPlayingSong} />
        </li>
    )

    if(hide) {
        return (
            <div>
                <h2><span onClick={toggleHidden} className="toggleShow"><FontAwesomeIcon icon={faPlus} /></span> Search For Additional Tracks</h2>
            </div>
        );
    }

    return (
        <div>
            <h2><span onClick={toggleHidden} className="toggleShow"><FontAwesomeIcon icon={faMinus} /></span> Search For Additional Tracks</h2>
            <div>
                <label htmlFor="tracksearch">Track name: </label>
                <input type="text" id="tracksearch" value={trackSearch} onChange={handleChangeTrack} name="tracksearch" />
                <button onClick={getTracks}>Search</button>
                <label htmlFor="artistsearch">Artist name: </label>
                <input type="text" id="artistsearch" value={artistSearch} onChange={handleChangeArtist} name="artistsearch" />
                <button onClick={getTrackByArtist}>Search</button>
            </div>
            <div id="searchedSongs">
                <ul>{trackLists}</ul>
            </div>
        </div>
    );
}
 
export default SearchForSongs;