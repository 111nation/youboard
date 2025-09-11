import {useEffect, useState} from "react";
import HomeBar from "../../components/NavBars/HomeBar";
import SmallProfile from "../../components/Profiles/SmallProfile";
import TopNav from "../../components/TopNav/TopNav";
import "./FollowList.css";
import {useParams} from "react-router-dom";
import {User, USER_ERRORS} from "../../user";
import {followers, following} from "../../follow";

function FollowList(props) {
	const {user} = useParams();
	let [userExists, setUserExists] = useState(false);
	let [followers_list, setFollowers] = useState([]);

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

	useEffect(() => {
		if (!userExists) return;
		User.getFromUsername(user.substring(1))
		.then(async (user) => {
			// Fetch followers
			try {
				if (props.title === "Followers") {
					setFollowers(await followers(user.uid));
				} else {
					setFollowers(await following(user.uid));
				}

			} catch (e) {
				console.log("Failed to fetch followers");
				console.log(e.message);
			}
		}) 
		.catch((e) => console.log(e.code));
	}, [userExists]);

	if (!userExists) return (
		<>
			<TopNav title={props.title}/>
			<HomeBar />
		</>
	);

	return (
		<>
			<TopNav title={props.title}/>
			<div className="page followlist-page">
				<div className="followlist-wrap">
					{followers_list.map(
						(user, index) => <SmallProfile key={index} username={user.username} />
					)}
				</div>
				<HomeBar />
			</div>
		</>
	);
}

export default FollowList;
