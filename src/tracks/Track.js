import './Track.css';


const Track = ({track, setCurrentPlayingSong}) => {

    const dragStart = (e) => {
        e.dataTransfer.setData('object', JSON.stringify(track));
        e.dataTransfer.setData('uri', track.uri);
        console.log("Drag Start", track);
    }

    const smallImageUrl = () => {
        const lastImage=track.album.images.length-1
        return track.album.images[lastImage].url;
    }

    return ( 
        <div className="trackDiv" onClick={() => setCurrentPlayingSong(track.uri)} onDragStart={dragStart} draggable>
            <img src={smallImageUrl()}></img>
            <div className="trackDivDetails">
                <div className="trackName">{track.name}</div>
                <div>{track.artists[0].name}</div>
            </div>
        </div>
     );
}
 
export default Track;