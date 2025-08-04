import "./Edit.css";

function Edit(props) {
	let type = props.type !== undefined ? props.type : "text";
	return (<input name={props.name} type={type} placeholder={props.placeholder} 
		className="edit" value={props.value} />
	);
}

export default Edit;
