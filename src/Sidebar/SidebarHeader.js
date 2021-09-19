import './SidebarHeader.css';

const SidebarHeader = () => {
    return (
        <div id="sidebarHeader">
            <h1>Playlist Maker</h1>
            <div className="steps">
                <span className="stepSpan">1</span><span className="stepText">Choose 5 tracks you love</span>
            </div>
            <div className="steps">
                <span className="stepSpan">2</span><span className="stepText">Make a playlist</span>
            </div>
        </div>
    );
}
 
export default SidebarHeader;