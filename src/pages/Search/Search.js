import "./Search.css";
import HomeBar from "../../components/NavBars/HomeBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Posts from "../../components/Cards/Posts";
import { useParams } from "react-router-dom";
import { searchForPosts, searchForProfiles } from "../../results";
import { useEffect, useState } from "react";

function ProfileResult(props) {
  const onClick = () => {
    if (!props.username) return;
    window.location.href = "/@" + props.username;
  };

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
  let [post_results, setPostResult] = useState([]);

  const getResults = async () => {
    let [profile_result, post_results] = await Promise.all([
      searchForProfiles(query),
      searchForPosts(query),
    ]);

    console.log(post_results);

    setProfileResult(profile_result);
    setPostResult(post_results);
  };

  useEffect(() => {
    getResults().catch((e) => {
      console.log(e);
    });
  }, []);

  let result = (
    <div className="profile-results">
      {profile_result.map((username, i) => (
        <ProfileResult key={i} username={username} />
      ))}
    </div>
  );

  return (
    <div className="page search-page">
      <div className="top-bar">
        <SearchBar placeholder={query} />
        <p className="subheading">{'"' + query + '"'}</p>
      </div>
      {profile_result.length ? result : null}
      <Posts posts={post_results} />
      <HomeBar />
    </div>
  );
}

export default Search;
