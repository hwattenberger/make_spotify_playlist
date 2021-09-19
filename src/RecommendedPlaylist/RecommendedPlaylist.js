import SelectedTrack from "../tracks/SelectedTrack";
import Popup from './../Utilities/Popup';
import SpotifyWebApi from 'spotify-web-api-js';

import { useState } from "react";


const RecommendedPlaylist = ({recommendedTracks, setCurrentPlayingSong, spotifyAccessToken, removeTrack}) => {
    const [userId, setUserId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const spotifyApi = new SpotifyWebApi();

    const getUserCreatePlaylist = (e) => {
        e.preventDefault();

        if (userId === "") {
            spotifyApi.getMe().then(function (data) {
                setUserId(data.id)
                createPlaylist(data.id);
            },
            function (err) {
                console.error(err);
            }
            );
        }
        else createPlaylist(userId);
    }

    const createPlaylist = (usersId) => {

        const options = {
            name: "Created playlist",
            description: "Created from website Playlist Maker"
        }

        spotifyApi.setAccessToken(spotifyAccessToken)
        spotifyApi.createPlaylist(usersId, options).then(function (data) {
            const playlistId = data.id;
            const trackURIs = recommendedTracks.map((track) => track.uri)
            spotifyApi.addTracksToPlaylist(playlistId, trackURIs).then(function (data) {
                setSuccessMsg("Created new playlist");
            })
        },
        function (err) {
            console.error(err);
        }
        );
    }

    const popupClose = () => {
        setErrorMsg("");
        setSuccessMsg("");
    }

    return ( 
        <div>
            <h2>Recommended Tracks</h2>
            <div className="recommendedMusic">
                <ul>
                    {recommendedTracks.map(track => (
                        <li key={track.id}>
                        <SelectedTrack track={track} setCurrentPlayingSong={setCurrentPlayingSong} removeTrack={removeTrack} />
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={getUserCreatePlaylist}>Create Playlist</button>
            <Popup errorMsg={errorMsg} onClose={popupClose} successMsg={successMsg}/>
        </div>
    );
}
 
export default RecommendedPlaylist;