import "./Btn.css";

function Btn(props) {
	return <button onClick={props.onClick} className="btn">{props.children}</button>;
}

export default Btn;
