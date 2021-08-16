import Track from "../tracks/Track";

const CurrentPlaylist = (props) => {
    const trackLists = props.trackList.map(track => 
        <li key={track.id}>
            <Track track={track} setCurrentPlayingSong={props.setCurrentPlayingSong} />
        </li>
    )

    return (
        <div>
            <h1>Your Spotify Top Tracks</h1>
            <ul>{trackLists}</ul>
        </div>
    );
}
 
export default CurrentPlaylist;