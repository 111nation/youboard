import Loader from "./Loader/Loader";
import "./PopUp.css";
import Post from "../Post/Post";

function PopUp(props) {
	return (
		<div className="popup-overlay">
			<div className="popup">
				<div className="subheading">
					{props.title}
				</div>

				<div className="popup-separator"></div>

				<div className="hint"> 
					{props.message}
				</div>

				{props.children}
		 	
				{props.loader === true && <Loader />}

			</div>
		</div>
	);
}

export default PopUp;
