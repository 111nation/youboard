import "./Edit.css";

function Edit(props) {
	let type = props.type !== undefined ? props.type : "text";
	let className = "edit " + (props.className ? props.className : "");
	return (<input name={props.name} type={type} placeholder={props.placeholder} 
		className={className} value={props.value} />
	);
}

export default Edit;
