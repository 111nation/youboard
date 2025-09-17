import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../components/Buttons/BackBtn";
import Posts from "../../components/Cards/Posts";
import PostComponent from "../../components/Post/Post";
import "./PostView.css";
import { useEffect, useState } from "react";
import { Post } from "../../post";
import { User } from "../../user";
import { numFollowers } from "../../follow";
import PopUp from "../../components/PopUp/PopUp";
import Btn from "../../components/Buttons/Btn";
import { getRelatedPosts } from "../../results";
import HomeBar from "../../components/NavBars/HomeBar";

function PostView() {
  const navigate = useNavigate();
  const { id } = useParams();
  let [popup, setPopUp] = useState(<></>);
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");
  let [username, setUsername] = useState("");
  let [link, setLink] = useState("");
  let [followers, setFollowers] = useState(0);
  let [hashtags, setHashtags] = useState("");
  let [loading, setLoading] = useState(false);
  let [related, setRelated] = useState([]);
  let [icon, setIcon] = useState("");

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
      setIcon(user.icon);
      if (post.hashtags.length > 0) setHashtags("#" + post.hashtags.join(" #"));

      const container = document.getElementById("postview-page");
      if (container) container.scrollTop = 0;

      setLoading(true);
      getRelatedPosts(post).then((result) => {
        setRelated(result);
        setLoading(false);
      });
    };

    loadPost().catch(() => {
      setPopUp(
        <PopUp
          title="No awesome content!"
          message="Are you sure this post exists?"
        >
          <Btn onClick={() => navigate(-1)}>Go Back</Btn>
        </PopUp>,
      );
    });
  }, [id]);

  return (
    <>
      {popup}
      <div id="postview-page" className="page postview-page">
        <PostComponent
          image={image}
          description={description}
          link={link}
          username={username}
          followers={followers}
          id={id}
          hashtags={hashtags}
          icon={icon}
        />

        <p className="subheading">Discover</p>
        <Posts loading={loading} posts={related} />
        <BackBtn />
        <HomeBar />
      </div>
    </>
  );
}

export default PostView;
