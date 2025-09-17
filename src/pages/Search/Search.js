import "./Search.css";
import HomeBar from "../../components/NavBars/HomeBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Posts from "../../components/Cards/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { searchForPosts, searchForProfiles } from "../../results";
import { useEffect, useState } from "react";

function ProfileResult(props) {
  const navigate = useNavigate();
  const onClick = () => {
    if (!props.username) return;
    navigate("/@" + props.username);
  };

  return (
    <div onClick={onClick} className="result-profile-wrap">
      <img
        src={!props.icon ? null : URL.createObjectURL(props.icon)}
        className="result-profile-img profile"
      />
      <p className="handle">{"@" + props.username}</p>
    </div>
  );
}

function Search() {
  const { query } = useParams();
  let [profile_results, setProfileResult] = useState([]);
  let [post_results, setPostResult] = useState([]);
  let [loading, setLoading] = useState(true);

  const getResults = async () => {
    setLoading(true);
    let [profile_results, post_results] = await Promise.all([
      searchForProfiles(query),
      searchForPosts(query),
    ]);

    setProfileResult(profile_results);
    setPostResult(post_results);
    setLoading(false);
  };

  useEffect(() => {
    getResults().catch((e) => {
      console.log(e);
    });
  }, [query]);

  let result = (
    <div className="profile-results">
      {profile_results.map((user, i) => (
        <ProfileResult key={i} username={user.username} icon={user.icon} />
      ))}
    </div>
  );

  return (
    <div className="page search-page">
      <div className="top-bar">
        <SearchBar placeholder={query} />
        <p className="subheading">{'"' + query + '"'}</p>
      </div>
      {profile_results.length ? result : null}
      <Posts posts={post_results} loading={loading} />
      <HomeBar />
    </div>
  );
}

export default Search;
