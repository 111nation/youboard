import "./Btn.css";

function BackBtn () {
	return (
	<button onClick={() => window.history.back()} className="back-btn">
		<svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 12H18M6 12L11 7M6 12L11 17" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	</button>
	);
}

export default BackBtn;
