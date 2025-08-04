import "./Btn.css";

function Btn(props) {
	return <button type={props.type} onClick={props.onClick} className={"btn " + props.className}>{props.children}</button>;
}

export default Btn;
