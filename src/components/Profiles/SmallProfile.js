import "./Profile.css"

function SmallProfile() {
	return (
		<div className="small-profile-wrap">
			<img className="profile"/>
			<div className="info-wrap">
				<p className="handle">sadboy</p>
				<p className="follower-count">92 Followers</p>
			</div>
		</div>
	);
}

export default SmallProfile;
