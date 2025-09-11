import {useEffect, useState} from "react";
import "./Btn.css";
import {currentUser, User} from "../../user";
import {follow, isFollowing, unfollow} from "../../follow";

function FollowBtn(props) {
	let [following, setFollowing] = useState(false);

	useEffect(() => {
		User.getFromUsername(props.target)
		.then(async (user) => {
			if (await isFollowing(user.uid, currentUser.uid)) {
				setFollowing(true);
			}
		}) 
		.catch(() => {})
	}, []);

	const onClick = async () => {	
		try {
			setFollowing(!following);
			let user = await User.getFromUsername(props.target);
			if (await isFollowing(user.uid, currentUser.uid)) {
				await unfollow(user.uid, currentUser.uid);
				setFollowing(false);
			} else {
				await follow(user.uid, currentUser.uid)
				setFollowing(true);
			}
		} catch (e) {
			// Show failed pop up
			console.log(e.message);
		}
	}

	let text = !following ? "Follow" : "Unfollow";
	let className =  !following ? "follow-btn" : "follow-btn unfollow-btn";


	return <button onClick={onClick} className={className}>{text}</button>;
}

export default FollowBtn;
