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
import {followersAndFollowingCount} from "../../follow";

const onSettingsClick = () => {
	window.location.href = "/settings";
}

// Own profile - Settings button
// Other profile - Follow button
const getControl = (user) => {
	let username = currentUser ? currentUser.username : "";
	if (username === user.substring(1)) { // Ignore '@' symbol
		return <Btn className="" onClick={onSettingsClick}>Settings</Btn>;
	} else {
		return <FollowBtn target={user.substring(1)}/>
	}
}

const loadingPopUp = () => {
	return (
		<PopUp 
			title="Loading your story!" 
			message="Loading your profile" 
			loader={true} 
		/>
	);
}

const errorPopUp = (title, msg) => {
	return (
		<PopUp
			title={title}
			message={msg}>
			<Btn onClick={() => window.history.back()}>Go Back</Btn>
		</PopUp>
	);
}

function Profile() {
	const {user} = useParams();
	let [popup, setPopUp] = useState(<></>);
	
	let [username, setUsername] = useState("");
	let [followers, setFollowers] = useState(0);
	let [following, setFollowing] = useState(0);


	const loadUser = async () => {
		setPopUp(loadingPopUp());

		let result = await User.getFromUsername(user.substring(1));

		// Get followers
		let [followers, following] = await followersAndFollowingCount(result.uid);

		setUsername(result.username);
		setFollowers(followers);
		setFollowing(following);

		setPopUp(<></>);
	}

	// Ensure that we viewing an existing user
	useEffect(() => {
		loadUser()
		.catch((e) => {
			// Failed to load user
			switch (e.code) {
				case USER_ERRORS.USER_DATA_NOT_FOUND:
					setPopUp(errorPopUp("User not found!", "This user hasn't joined youboard, yet!"));
				default:
					return setPopUp(errorPopUp("Errors!", "Failed to fetch account :("));
			}
		})
	}, []);

	return (
		<div className="page profile-page">
			{popup}
			<div className="profile-info-wrap">
				<BigProfile username={username} followers={followers} following={following} />	
				{getControl(user)}
			</div>

			<Posts />
			<BackBtn />
			<HomeBar index={2}/>
		</div>
	);
}

export default Profile;
