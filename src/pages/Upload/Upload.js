import { useState } from "react";
import Btn from "../../components/Buttons/Btn";
import Edit from "../../components/Edits/Edit";
import TextArea from "../../components/Edits/TextArea";
import TopNav from "../../components/TopNav/TopNav";
import "./Upload.css";
import { Post } from "../../post";
import PopUp from "../../components/PopUp/PopUp";

function Upload() {
  let [preview, setPreview] = useState("");
  let [popup, setPopUp] = useState(<></>);

  const onImageSelect = async (e) => {
    let photo = e.target.files[0];
    if (!photo) return;

    setPreview(URL.createObjectURL(photo));
  };

  const onSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let photo = formData.get("photo");
    let description = formData.get("description");
    let link = formData.get("link");

    if (!photo) return;

    try {
      setPopUp(
        <PopUp
          title="About to go viral!"
          message="Wait while we upload your post."
          loader={true}
        />,
      );
      await Post.createNew(photo, description, link);
      setPopUp(
        <PopUp title="Let's go viral!" message="Successfully #posted!">
          <Btn onClick={() => (window.location.href = "/")}>Home</Btn>
        </PopUp>,
      );
    } catch (e) {
      setPopUp(
        <PopUp title="An error occurred!" message={e.code}>
          <Btn onClick={() => (window.location.href = "/")}>Home</Btn>
        </PopUp>,
      );
    }
  };

  return (
    <>
      {popup}
      <TopNav title="Upload" />
      <form onSubmit={(e) => onSumbit(e)} className="upload-wrap">
        <div className="upload-photo">
          {preview && <img src={preview} />}
          <input
            onChange={(e) => onImageSelect(e)}
            type="file"
            accept="image/*"
            id="upload-photo"
            name="photo"
          />
        </div>
        <label htmlFor="upload-photo" className="option select-photo-option">
          Select Photo
        </label>
        <TextArea
          name="description"
          className="upload-desc"
          placeholder="Share something #wicked"
        />
        <p>Link a website</p>
        <Edit name="link" placeholder="https://example.com" type="url" />
        <Btn type="submit" className="active">
          Post
        </Btn>
      </form>
    </>
  );
}

export default Upload;
