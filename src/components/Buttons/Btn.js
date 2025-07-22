import "./Btn.css";

function Btn(props) {
	return <button onClick={props.onClick} className={"btn " + props.className}>{props.children}</button>;
}

export default Btn;
