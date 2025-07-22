import "./Search.css"
import HomeBar from "../../components/NavBars/HomeBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Posts from "../../components/Cards/Posts";

function Search() {
	return (
		<div className="page search-page">
			<div className="top-bar">
				<SearchBar placeholder="nissan 200sx"/>
				<p className="subheading">"nissan 200sx"</p>
			</div>
			<Posts />
			<HomeBar />
		</div>
	);
}

export default Search;
