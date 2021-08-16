import Track from "../tracks/Track";
import SpotifyWebApi from 'spotify-web-api-js';

import { useEffect, useState } from "react";
import { select } from "async";

const NewPlaylist = (props) => {
    const [selectedTracks, setSelectedTracks] = useState([]);

    // useEffect(() => {

    // }, [selectedTracks]);

    const onDrop = (e) => {
        const droppedTrack = JSON.parse(e.dataTransfer.getData('object'));
        
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
        return found;
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const getRecommendations = () => {
        console.log("yes")
        const spotifyApi = new SpotifyWebApi();
        // spotifyApi.setAccessToken(parsedHash);          
          
        const details = {
            seed_artists: [],
            seed_genres: [],
            seed_tracks: selectedTracks.map(track => track.id)
        }

        console.log("Details", details)

        spotifyApi.getRecommendations(details).then(function (data) {
            console.log('Top tracks', data);
        },
        function (err) {
            console.error(err);
        }
        );
    }

    const showBtn = () => {
        console.log("HI ", selectedTracks.length)
        if(selectedTracks.length>0) {
            return <button onClick={getRecommendations}>Get Recommendations</button>
        }
        else return;
    }

    return ( 
        <div id="NewPlaylistDiv" onDrop={onDrop} onDragOver={onDragOver}>
            <h2>Selected Tracks</h2>
            <ul>
                {selectedTracks.map(track => (
                    <li key={track.id}>
                    <Track track={track} setCurrentPlayingSong={props.setCurrentPlayingSong} />
                    </li>
                ))}
            </ul>
            {showBtn()}
        </div>
     );
}
 
export default NewPlaylist;