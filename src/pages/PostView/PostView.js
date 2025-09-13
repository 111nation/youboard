import {useParams} from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import Posts from "../../components/Cards/Posts";
import SaveBar from "../../components/NavBars/SaveBar";
import PostComponent from "../../components/Post/Post";
import "./PostView.css";
import {useEffect, useState} from "react";
import {Post} from "../../post";
import {User} from "../../user";
import {numFollowers} from "../../follow";
import PopUp from "../../components/PopUp/PopUp";
import Btn from "../../components/Buttons/Btn";

function PostView() {
	const {id} = useParams();
	let [popup, setPopUp] = useState(<></>);
	let [image, setImage] = useState("");
	let [description, setDescription] = useState("");
	let [username, setUsername] = useState("");
	let [link, setLink] = useState("");
	let [followers, setFollowers] = useState(0);

	useEffect(() => {
		const loadPost = async () => {
			let post = await Post.load(id);	
			let user = await User.getFromUid(post.uid);
			let followers = await numFollowers(post.uid);

			setImage(URL.createObjectURL(post.file));
			setDescription(post.description);
			setLink(post.link);
			setUsername(user.username);
			setFollowers(followers);
		}

		loadPost()
		.catch (() => {
			setPopUp(
				<PopUp	
					title="No awesome content!"
					message="Are you sure this post exists?"
				>
					<Btn onClick={() => window.history.back()}>Go Back</Btn>
				</PopUp>
			);
		});
	}, []);

	return (
		<>
		{popup}
		<div className="page postview-page"> 
			<PostComponent 
				image={image}
				description={description}
				link={link}
				username={username}
				followers={followers}
			/>

			<Posts />
			<BackBtn />
			<SaveBar />
		</div>
		</>
	);
}

export default PostView;
