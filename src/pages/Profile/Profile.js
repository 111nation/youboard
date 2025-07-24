import BackBtn from "../../components/Buttons/BackBtn";
import FollowBtn from "../../components/Buttons/FollowBtn";
import Posts from "../../components/Cards/Posts";
import HomeBar from "../../components/NavBars/HomeBar";
import BigProfile from "../../components/Profiles/BigProfile";
import "./Profile.css";

function Profile() {
	return (
		<div className="page profile-page">
			<div className="profile-info-wrap">
				<BigProfile />	
				<FollowBtn />
			</div>

			<Posts />
			<BackBtn />
			<HomeBar />
		</div>
	);
}

export default Profile;
