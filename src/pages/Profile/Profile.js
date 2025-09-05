import {useParams} from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import FollowBtn from "../../components/Buttons/FollowBtn";
import Posts from "../../components/Cards/Posts";
import HomeBar from "../../components/NavBars/HomeBar";
import BigProfile from "../../components/Profiles/BigProfile";
import "./Profile.css";

function Profile() {
	const {user} = useParams();

	return (
		<div className="page profile-page">
			<div className="profile-info-wrap">
				<BigProfile username={user} />	
				<FollowBtn />
			</div>

			<Posts />
			<BackBtn />
			<HomeBar />
		</div>
	);
}

export default Profile;
