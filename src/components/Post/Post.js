import {useEffect, useState} from "react";
import FollowBtn from "../Buttons/FollowBtn";
import VisitBtn from "../Buttons/VisitBtn";
import UserInfo from "../Profiles/UserInfo";
import "./Post.css";
import {currentUser} from "../../user";

function Post(props) {
	let [control, setControl] = useState(<></>);

	useEffect(() => {
		if (currentUser.username === props.username) {
			setControl(<></>);
		} else {
			setControl(<FollowBtn target={props.username} />);
		}
	}
	, [props.username])

	return (
		<div className="post-wrap">
			<div className="img-wrap">
				<img src={props.image ? props.image : null} className="post-img"/>
				{props.link && <VisitBtn onClick={() => window.location.href=props.link}/>}
			</div>
			<div className="user-info">
				<UserInfo username={props.username} followers={props.followers} />
				{control}
			</div>
			<div className="post-desc">
				{props.description}
			</div>
		</div>
	);
}

export default Post;
