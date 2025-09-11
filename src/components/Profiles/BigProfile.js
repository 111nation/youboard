import {useEffect, useState} from "react";
import {followers, following} from "../../follow";
import "./Profile.css"
import {User} from "../../user";
import {Link} from "react-router-dom";

function BigProfile(props) {
	let [num_followers, setFollowers] = useState(0);
	let [num_following, setFollowing] = useState(0);

	useEffect(() => {
		User.getFromUsername(props.username)
		.then(async (user) => {
			// Fetch follower counts
			try {
				setFollowers((await followers(user.uid)).length);
				setFollowing((await following(user.uid)).length);

			} catch (e) {
				console.log("Failed to fetch followers");
				console.log(e.message);
			}
		}) 
		.catch((e) => console.log(e.code));
	}, []);

	return (
		<div className="big-profile-wrap">
			<img className="profile"/>
			<p className="handle">{"@" + props.username}</p>
			<p className="follower-count">
				<Link to="followers">{String(num_followers)} Followers</Link> &#9;|&nbsp;&#9;  
				<Link to="following">{String(num_following)} Following</Link>
			</p>
		</div>
	);
}

export default BigProfile;
