import "./Btn.css";

function SaveBtn(props) {
	return <button onClick={props.onClick} className="save-btn">Save</button>;
}

export default SaveBtn;
