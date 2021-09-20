import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect, useState } from "react";


const SpotifyPlayerContainer = (props) => {
    const [playerPlaying, setPlayerPlaying] = useState("false");

    useEffect(() => {
        if(props.currentPlayingSong) setPlayerPlaying("true");
      }, [props.currentPlayingSong]);

    const onDrop = (e) => {
        const dropUri=e.dataTransfer.getData('uri');
        if(dropUri) {
            props.setCurrentPlayingSong(dropUri);
            setPlayerPlaying("true");
        }
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    if(props.currentPlayingSong) {
        return ( 
            <div onDrop={onDrop} onDragOver={onDragOver}>
                <SpotifyPlayer
                    token={props.accessToken}
                    uris={[props.currentPlayingSong]}
                    autoPlay="true"
                    initialVolume=".5"
                    play={playerPlaying}
                    showSaveIcon="true"
                    styles={{
                        bgColor: '#191414',
                        color: 'white',
                        trackNameColor: 'white',
                        sliderHandleColor: '#1DB954'
                    }}
                    />
            </div>
        );
    }
    return (
        <div onDrop={onDrop} onDragOver={onDragOver}>
            <h2>Click a song to play it or drag one in</h2>
        </div>
    )
}
 
export default SpotifyPlayerContainer;