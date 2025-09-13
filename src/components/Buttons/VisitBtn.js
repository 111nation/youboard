import "./Btn.css";

function VisitBtn(props) {
	return (
	<button onClick={props.onClick} className="visit-btn">
		Visit Site
		<svg viewBox="0 0 24 24" className="icon" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	</button>
	);
}

export default VisitBtn;
