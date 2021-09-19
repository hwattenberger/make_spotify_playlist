import Track from "../tracks/Track";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const CurrentPlaylist = (props) => {
    const [hide, setHide] = useState(false);

    const toggleHidden = () => {
        setHide(!hide);
    }

    const trackLists = props.trackList.map(track => 
        <li key={track.id}>
            <Track track={track} setCurrentPlayingSong={props.setCurrentPlayingSong} />
        </li>
    )

    if(hide) {
        return (
            <div>
                <h2><span onClick={toggleHidden} className="toggleShow"><FontAwesomeIcon icon={faPlus} /></span> Your Spotify Top Tracks</h2>
            </div>
        );
    }
    return (
        <div>
        <h2><span onClick={toggleHidden} className="toggleShow"><FontAwesomeIcon icon={faMinus} /></span> Your Spotify Top Tracks</h2>
            <div id="currentPlaylist">
                <ul>{trackLists}</ul>
            </div>
        </div>
    );
}
 
export default CurrentPlaylist;