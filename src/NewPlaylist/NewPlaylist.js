import SelectedTrack from "../tracks/SelectedTrack";
import SpotifyWebApi from 'spotify-web-api-js';
import Popup from './../Utilities/Popup';

import { useState } from "react";

const NewPlaylist = (props) => {
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const onDrop = (e) => {
        const droppedTrack = JSON.parse(e.dataTransfer.getData('object'));
        
        if(selectedTracks.length === 5) {
            setErrorMsg("Can only have 5 tracks");
            return;
        }

        if(droppedTrack && !alreadyInArray(droppedTrack)) {
            setSelectedTracks([...selectedTracks, droppedTrack]);
        }
    }

    const alreadyInArray = (newTrack) => {
        let found=false;
        selectedTracks.forEach((track) => {
            if(track.uri === newTrack.uri) {
                found=true;
                return found;
            }
        })
        if (found) setErrorMsg("Track already in list");
        return found;
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const getRecommendations = () => {
        const spotifyApi = new SpotifyWebApi();        
          
        const details = {
            seed_artists: [],
            seed_genres: [],
            seed_tracks: selectedTracks.map(track => track.id)
        }

        spotifyApi.getRecommendations(details).then(function (data) {
            props.setRecommendedTracks(data.tracks);
        },
        function (err) {
            console.error(err);
        }
        );
    }

    const showBtn = () => {
        if(selectedTracks.length>0) {
            return <button onClick={getRecommendations}>Get Recommendations</button>
        }
        else return;
    }

    const showDragMessage = () => {
        if(selectedTracks.length>0) {
            return null;
        }
        else return <p>Drag Tracks Here</p>;
    }

    const removeTrack = (id, e) => {
        e.stopPropagation();
        const newTracks = selectedTracks.filter((track) => track.id !== id);
        setSelectedTracks(newTracks);
    }
    
    const popupClose = () => {
        setErrorMsg("");
    }

    return ( 
        <div id="NewPlaylistDiv" onDrop={onDrop} onDragOver={onDragOver}>
            <span>Selected Songs (5 max):</span>
            <div className="musicList">
                {showDragMessage()}
                <ul>
                    {selectedTracks.map(track => (
                        <li key={track.id}>
                        <SelectedTrack track={track} setCurrentPlayingSong={props.setCurrentPlayingSong} removeTrack={removeTrack} />
                        </li>
                    ))}
                </ul>
            </div>
            <div id="recommendationBtnDiv">
                {showBtn()}
            </div>
        <Popup errorMsg={errorMsg} onClose={popupClose} />
        </div>
     );
}
 
export default NewPlaylist;