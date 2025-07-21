import "./NavBar.css";

function NavBar(props) {
	let className = "navbar " + props.className;
	return <div className={className}>{props.children}</div>
}

export default NavBar;
