import { useEffect, useState } from "react";
import FollowBtn from "../Buttons/FollowBtn";
import Btn from "../Buttons/Btn";
import VisitBtn from "../Buttons/VisitBtn";
import UserInfo from "../Profiles/UserInfo";
import "./Post.css";
import { currentUser } from "../../user";
import { deletePost } from "../../post";
import PopUp from "../PopUp/PopUp";

function Post(props) {
  let [control, setControl] = useState(<></>);
  let [popup, setPopUp] = useState(<></>);

  const onPostDelete = async () => {
    setPopUp(
      <PopUp
        title="Deleting post!"
        message="Your post is being removed"
        loader={true}
      />,
    );

    try {
      await deletePost(props.id);
      window.location.href = "/";
      setPopUp(<></>);
    } catch (_) {
      setPopUp(
        <PopUp title="Failed!" message="Failed to delete post!">
          <Btn onClick={() => (window.location.href = "/")}>Home</Btn>
        </PopUp>,
      );
    }
  };

  const showConfirmation = () => {
    setPopUp(
      <PopUp
        title="Mysterious is the new cool???"
        message="About to erase your mark on youboard."
      >
        <Btn onClick={() => onPostDelete()}>Delete</Btn>
        <Btn className="active" onClick={() => setPopUp(<></>)}>
          Cancel
        </Btn>
      </PopUp>,
    );
  };

  useEffect(() => {
    if (!props.username) return;

    if (currentUser.username === props.username) {
      setControl(<Btn onClick={showConfirmation}>Delete</Btn>);
    } else {
      setControl(<FollowBtn target={props.username} />);
    }
  }, [props.username]);

  return (
    <>
      {popup}
      <div className="post-wrap">
        <div className="img-wrap">
          {!props.image && <div className="image-loader"></div>}
          <img src={props.image ? props.image : null} className="post-img" />
          {props.link && (
            <VisitBtn onClick={() => (window.location.href = props.link)} />
          )}
        </div>
        <div className="user-info">
          <UserInfo username={props.username} followers={props.followers} />
          {control}
        </div>
        <div className="post-desc">
          {props.description}
          <p className="hashtag">{props.hashtags}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
