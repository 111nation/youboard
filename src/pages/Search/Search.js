import "./Search.css"
import HomeBar from "../../components/NavBars/HomeBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Posts from "../../components/Cards/Posts";
import {useParams} from "react-router-dom";
import {searchForProfiles} from "../../search";
import {useEffect, useState} from "react";

function ProfileResult(props) {
	const onClick = () => {
		if (!props.username) return;
		window.location.href = "/@" + props.username;
	}

	return (
		<div onClick={onClick} className="result-profile-wrap">
			<img className="result-profile-img profile" />
			<p className="handle">{"@" + props.username}</p>
		</div>
	);
}

function Search() {
	const { query } = useParams();
	let [profile_result, setProfileResult] = useState([]);

	useEffect(() => {
		searchForProfiles(query) 
		.then(res => setProfileResult(res))
		.catch(e => console.log(e));
	}, [])

	let result = (
		<div className="profile-results">
			{profile_result.map((username, i) => <ProfileResult key={i} username={username}/>)}
		</div>
	);

	return (
		<div className="page search-page">
			<div className="top-bar">
				<SearchBar placeholder={query}/>
				<p className="subheading">{"\"" + query + "\""}</p>
			</div>
			{profile_result.length ? result : null}
			<Posts />
			<HomeBar />
		</div>
	);
}

export default Search;
