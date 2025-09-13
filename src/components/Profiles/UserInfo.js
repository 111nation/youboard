import "./Profile.css"

function SmallProfile(props) {
	let username = props.username;
	let followers = props.followers;

	const handleClick = () => {
		if (!username) return;
		window.location.href = "/@" + username;
	}

	return (
		<div onClick={handleClick} className="user-info-wrap">
			<img className="profile"/>
			<div className="info-wrap">
				<p className="handle">{"@" + username}</p>
				<p className="follower-count">{followers} Followers</p>
			</div>
		</div>
	);
}

export default SmallProfile;
