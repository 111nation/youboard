import "./Profile.css"
import {Link} from "react-router-dom";

function BigProfile(props) {
	return (
		<div className="big-profile-wrap">
			<img className="profile"/>
			<p className="handle">{props.username}</p>
			<p className="follower-count">
				<Link to="followers">92 Followers</Link> | <Link to={"following"}>5 Following</Link>
			</p>
		</div>
	);
}

export default BigProfile;
