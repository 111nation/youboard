import {useParams} from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import Btn from "../../components/Buttons/Btn";
import FollowBtn from "../../components/Buttons/FollowBtn";
import Posts from "../../components/Cards/Posts";
import HomeBar from "../../components/NavBars/HomeBar";
import BigProfile from "../../components/Profiles/BigProfile";
import "./Profile.css";
import {currentUser, User, USER_ERRORS} from "../../user";
import {useState} from "react";

function Profile() {
	const {user} = useParams();
	let [userExists, setUserExists] = useState(false);

	// Ensure that we viewing an existing user
	User.getFromUsername(user.substring(1))
	.then(() => setUserExists(true))
	.catch ((e) => {
		switch (e.code) {
			case USER_ERRORS.USER_DATA_NOT_FOUND:
				return window.location.href = "/404/User does not exist :(";
			default:
				return window.location.href = "/404/Failed to fetch user :(";
		}
	});

	if (!userExists) return <></>;

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

	return (
		<div className="page profile-page">
			<div className="profile-info-wrap">
				<BigProfile username={user} />	
				{getControl()}
			</div>

			<Posts />
			<BackBtn />
			<HomeBar index={2}/>
		</div>
	);
}

export default Profile;
