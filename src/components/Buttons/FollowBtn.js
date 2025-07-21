import "./Btn.css";

function FollowBtn(props) {
	let className = !props.following ? "follow-btn" : "follow-btn unfollow-btn";
	let text = !props.following ? "Follow" : "Unfollow";

	return <button onClick={props.onClick} className={className}>{text}</button>;
}

export default FollowBtn;
