import {useParams} from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import Btn from "../../components/Buttons/Btn";
import FollowBtn from "../../components/Buttons/FollowBtn";
import Posts from "../../components/Cards/Posts";
import HomeBar from "../../components/NavBars/HomeBar";
import BigProfile from "../../components/Profiles/BigProfile";
import "./Profile.css";
import {useState} from "react";
import {currentUser} from "../../user";

function Profile() {
	const {user} = useParams();
	let [controls, setControl] = useState(<></>);	

	// Own profile - Settings button
	// Other profile - Follow button
	const getControl = () => {
		let username = currentUser ? currentUser.username : "";
		if (username === user.substring(1)) { // Ignore '@' symbol
			return <Btn className="">Settings</Btn>;
		} else {
			return <FollowBtn />
		}
	}

	// Determine if user is seeing their own page or another user's
	setControl(getControl());

	return (
		<div className="page profile-page">
			<div className="profile-info-wrap">
				<BigProfile username={user} />	
				{controls}
			</div>

			<Posts />
			<BackBtn />
			<HomeBar index={2}/>
		</div>
	);
}

export default Profile;
