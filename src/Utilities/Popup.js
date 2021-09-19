import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Popup.css';

const Popup = ({errorMsg, successMsg, onClose}) => {

    if (!errorMsg && !successMsg) return null;

    if (errorMsg) {
        return (
            <div id="popupDiv">
                {errorMsg}
                <FontAwesomeIcon className="closeIcon" icon={faTimes} onClick={onClose}/>
            </div>
        )
    }

    if (successMsg) {
        return (
            <div id="popupDiv" className="success">
                {successMsg}
                <FontAwesomeIcon className="closeIcon" icon={faTimes} onClick={onClose}/>
            </div>
        )
    }
}

export default Popup;