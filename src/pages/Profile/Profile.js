import {useParams} from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import Btn from "../../components/Buttons/Btn";
import FollowBtn from "../../components/Buttons/FollowBtn";
import Posts from "../../components/Cards/Posts";
import HomeBar from "../../components/NavBars/HomeBar";
import BigProfile from "../../components/Profiles/BigProfile";
import "./Profile.css";
import {currentUser, User, USER_ERRORS} from "../../user";
import {useEffect, useState} from "react";
import PopUp from "../../components/PopUp/PopUp";

const onSettingsClick = () => {
	window.location.href = "/settings";
}


function Profile() {
	const {user} = useParams();
	let [userExists, setUserExists] = useState(false);
	let [popup, setPopUp] = useState(<></>);

	// Ensure that we viewing an existing user
	useEffect(() => {
		User.getFromUsername(user.substring(1))
		.then(() => setUserExists(true))
		.catch ((e) => {
			switch (e.code) {
				case USER_ERRORS.USER_DATA_NOT_FOUND:
					return window.location.href = "/404/User does not exist :(";
				default:
					return window.location.href = "/404/Failed to fetch user :(";
			}
		})
	}, []);

	if (!userExists) return <></>;

	// Own profile - Settings button
	// Other profile - Follow button
	const getControl = () => {
		let username = currentUser ? currentUser.username : "";
		if (username === user.substring(1)) { // Ignore '@' symbol
			return <Btn className="" onClick={onSettingsClick}>Settings</Btn>;
		} else {
			return <FollowBtn target={user.substring(1)}/>
		}
	}

	return (
		<div className="page profile-page">
			{popup}
			<div className="profile-info-wrap">
				<BigProfile username={user.substring(1)} />	
				{getControl()}
			</div>

			<Posts />
			<BackBtn />
			<HomeBar index={2}/>
		</div>
	);
}

export default Profile;
