import "./Profile.css";
import { Link } from "react-router-dom";

function BigProfile(props) {
  let username = props.username || "";
  let followers = props.followers || 0;
  let following = props.following || 0;

  return (
    <div className="big-profile-wrap">
      <img
        src={!props.icon ? null : URL.createObjectURL(props.icon)}
        className="profile"
      />
      <p className="handle">{"@" + username}</p>
      <p className="follower-count">
        <Link to="followers">{followers} Followers</Link> &#9;|&nbsp;&#9;
        <Link to="following">{following} Following</Link>
      </p>
      {props.bio && <p>{props.bio}</p>}
    </div>
  );
}

export default BigProfile;
