import "./Profile.css"

function SmallProfile(props) {
	const handleClick = () => {
		window.location.href = "/@" + props.username;
	}

	return (
		<div onClick={handleClick} className="small-profile-wrap">
			<img className="profile"/>
			<div className="info-wrap">
				<p className="handle">{props.username}</p>
				<p className="follower-count">92 Followers</p>
			</div>
		</div>
	);
}

export default SmallProfile;
