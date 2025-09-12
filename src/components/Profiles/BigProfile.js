import {useEffect, useState} from "react";
import "./Profile.css"
import {Link} from "react-router-dom";
import {followersAndFollowingCount} from "../../follow";

function BigProfile(props) {
	let user = props.user;
	let [followers, setFollowers] = useState(0);
	let [following, setFollowing] = useState(0);
	
	const loadFollowers = async () => {
		let [followers, following] = await followersAndFollowingCount(user.uid);

		setFollowers(followers);
		setFollowing(following);
	}

	useEffect(() => {
		// Don't display pop up, assume parent component handles errors
		if (!user) return;
		loadFollowers();
	}, [user]);

	if (!user) {
		return (
			<div className="big-profile-wrap">
				<img className="profile"/>
				<p className="handle">@</p>
				<p className="follower-count">
					0 Followers &#9;|&nbsp;&#9; 0 Following
				</p>
			</div>
		);
	}

	return (
		<div className="big-profile-wrap">
			<img className="profile"/>
			<p className="handle">{"@" + user.username}</p>
			<p className="follower-count">
				<Link to="followers">{followers} Followers</Link> &#9;|&nbsp;&#9;  
				<Link to="following">{following} Following</Link>
			</p>
		</div>
	);
}

export default BigProfile;
