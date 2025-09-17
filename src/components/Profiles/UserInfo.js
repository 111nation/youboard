import { useNavigate } from "react-router-dom";
import "./Profile.css";

function SmallProfile(props) {
  const navigate = useNavigate();
  let username = props.username;
  let followers = props.followers;

  const handleClick = () => {
    if (!username) return;
    navigate("/@" + username);
  };

  return (
    <div onClick={handleClick} className="user-info-wrap">
      <img
        src={!props.icon ? null : URL.createObjectURL(props.icon)}
        className="profile"
      />
      <div className="info-wrap">
        <p className="handle">{"@" + username}</p>
        <p className="follower-count">{followers} Followers</p>
      </div>
    </div>
  );
}

export default SmallProfile;
