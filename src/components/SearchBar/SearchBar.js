import "./SearchBar.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();
  let placeholder = props.placeholder ? props.placeholder : "Search...";

  const search = (event) => {
    let key = event.key;
    if (key === "Enter") {
      let query = event.target.value;
      navigate("/search/" + query);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      onKeyUp={(e) => search(e)}
      className="searchbar"
    />
  );
}

export default SearchBar;
