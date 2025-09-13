import "./Profile.css"

function SmallProfile(props) {
	let username = props.username ? props.username : "";
	let followers = props.followers ? props.followers : 0;

	const handleClick = () => {
		if (!props.username) return;
		window.location.href = "/@" + username;
	}

	return (
		<div onClick={handleClick} className="small-profile-wrap">
			<img className="profile"/>
			<div className="info-wrap">
				<p className="handle">{"@" + username}</p>
				<p className="follower-count">{followers} Followers</p>
			</div>
		</div>
	);
}

export default SmallProfile;
