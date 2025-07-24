import BackBtn from "../../components/Buttons/BackBtn";
import Posts from "../../components/Cards/Posts";
import SaveBar from "../../components/NavBars/SaveBar";
import Post from "../../components/Post/Post";
import "./PostView.css";

function PostView() {
	return (
		<div className="page postview-page"> 
			<Post />

			<Posts />
			<BackBtn />
			<SaveBar />
		</div>
	);
}

export default PostView;
