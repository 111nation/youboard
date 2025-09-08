import "./Search.css"
import HomeBar from "../../components/NavBars/HomeBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Posts from "../../components/Cards/Posts";
import {Link, useParams} from "react-router-dom";
import {auth} from "../../firebase";
import {onAuthStateChanged} from "firebase/auth";

function ProfileResult() {
	return (
		<Link to="/@sadboy">
			<div className="result-profile-wrap">
				<img className="result-profile-img profile" />
				<p className="handle">@sadboy</p>
			</div>
		</Link>
	);
}

function Search() {
	onAuthStateChanged(auth, (user) => {
		if (!user) window.location.href = "/login";
	});

	const { query } = useParams();

	return (
		<div className="page search-page">
			<div className="top-bar">
				<SearchBar placeholder={query}/>
				<p className="subheading">{"\"" + query + "\""}</p>
			</div>
			<div className="profile-results">
				<ProfileResult />
				<ProfileResult />
				<ProfileResult />
			</div>
			<Posts />
			<HomeBar />
		</div>
	);
}

export default Search;
