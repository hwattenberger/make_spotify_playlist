import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Track.css';
import SpotifyWebApi from 'spotify-web-api-js';

import { useState } from "react";


const SelectedTrack = ({track, setCurrentPlayingSong, removeTrack}) => {
    const [like, setLike] = useState(false);

    const likeTrack = (e) => {
        e.stopPropagation();
        const spotifyApi = new SpotifyWebApi();

        if (!like) {
            spotifyApi.addToMySavedTracks([track.id]).then(function (data) {
                setLike(true);
            },
            function (err) {
                console.error(err);
            }
            );
        }
        else {
            spotifyApi.removeFromMySavedTracks([track.id]).then(function (data) {
                setLike(false);
            },
            function (err) {
                console.error(err);
            }
            );
        }
    }

    const smallImageUrl = () => {
        const lastImage=track.album.images.length-1
        return track.album.images[lastImage].url;
    }

    const likeClass = () => {
        if (like) return "likeTrack liked";
        return "likeTrack";
    }

    return ( 
        <div className="trackDiv selectedTrackDiv" onClick={() => setCurrentPlayingSong(track.uri)}>
            
            <img src={smallImageUrl()} alt="albumCover"></img>
            <div className="trackDivDetails">
                <div className="trackName" title={track.name}>{track.name}</div>
                <div className="artist">{track.artists[0].name}</div>
                <div className="icons">
                    <span className={likeClass()} onClick={likeTrack} title="Like"><FontAwesomeIcon icon={faHeart} /></span>
                    <span className="deleteTrack" onClick={(e) => removeTrack(track.id, e)} title="Remove"><FontAwesomeIcon icon={faTrash} /></span>
                </div>
            </div>
        </div>
     );
}
 
export default SelectedTrack;