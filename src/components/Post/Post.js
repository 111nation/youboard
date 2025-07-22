import FollowBtn from "../Buttons/FollowBtn";
import VisitBtn from "../Buttons/VisitBtn";
import UserInfo from "../Profiles/UserInfo";
import "./Post.css";

function Post() {
	return (
		<div className="post-wrap">
			<div className="img-wrap">
				<img className="post-img"/>
				<VisitBtn />
			</div>
			<div className="user-info">
				<UserInfo />
				<FollowBtn />
			</div>
			<div className="post-desc">
				<p>Im so sad :(</p>
				<p className="hashtag">#sadboy #sadboylife</p>
			</div>
		</div>
	);
}

export default Post;
