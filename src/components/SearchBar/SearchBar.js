import "./SearchBar.css";
import "../../index.css";

function SearchBar(props) {
	let placeholder = props.placeholder ? props.placeholder : "Search..."

	const search = (event) => {
		let key = event.key;
		if (key == "Enter") {
			let query = event.target.value;
			window.location.href = "/search/" + query;
		}
	}
	
	return <input type="text" placeholder={placeholder} onKeyUp={(e) => search(e)} className="searchbar"/>
}

export default SearchBar;
