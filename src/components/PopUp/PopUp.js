import "./PopUp.css";

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

			</div>
		</div>
	);
}

export default PopUp;
