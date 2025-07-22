import "./SearchBar.css";
import "../../index.css";

function SearchBar(props) {
	let placeholder = props.placeholder ? props.placeholder : "Search..."

	return <input type="text" placeholder={placeholder} className="searchbar"/>
}

export default SearchBar;
