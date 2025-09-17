import { useEffect, useState } from "react";
import Btn from "../../components/Buttons/Btn";
import TextArea from "../../components/Edits/TextArea";
import TopNav from "../../components/TopNav/TopNav";
import "./Settings.css";
import { changeProfilePhoto, currentUser, USER_ERRORS } from "../../user";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import PopUp from "../../components/PopUp/PopUp";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();
  let [icon, setIcon] = useState(null);
  let [username, setUsername] = useState("");
  let [bio, setBio] = useState("");
  let [popup, setPopUp] = useState(<></>);

  const onImageSelect = async (e) => {
    let photo = e.target.files[0];
    if (!photo) return;
    setIcon(photo);
  };

  const changeIcon = async (icon) => {
    changeProfilePhoto(currentUser.uid, icon);
    currentUser.icon = icon;
    setIcon(icon);
  };

  const changeBio = async (bio) => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      bio: bio,
    });
    currentUser.bio = bio;
    setBio(bio);
  };

  const onSubmit = async (e) => {
    setPopUp(
      <PopUp
        title="Updating profile"
        message="Hold on while we update your profile"
        loader={true}
      />,
    );

    try {
      if (!currentUser) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };
      e.preventDefault();

      const formData = new FormData(e.target);
      let icon = formData.get("icon");
      let bio = formData.get("bio");

      if (icon && icon.name && bio.length > 0) {
        await Promise.all([changeBio(bio), changeIcon(icon)]);
      } else if (bio.length > 0) {
        await changeBio(bio);
      } else if (icon && icon.name) {
        await changeIcon(icon);
      }

      setPopUp(
        <PopUp title="#Personalization" message="Profile successfully updated">
          <Btn onClick={() => navigate("/")}>Home</Btn>
        </PopUp>,
      );
    } catch (e) {
      setPopUp(
        <PopUp title="An error occurred!" message={e.code}>
          <Btn className="active" onClick={() => navigate("/")}>
            Home
          </Btn>
          <Btn onClick={() => navigate("/")}>Cancel</Btn>
        </PopUp>,
      );
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    setUsername(currentUser.username);
    setBio(currentUser.bio);
    setIcon(currentUser.icon);
  }, []);

  return (
    <>
      {popup}
      <TopNav title="Account Settings" />
      <form className="account-settings-page" onSubmit={(e) => onSubmit(e)}>
        <div className="profile">
          <img src={!icon ? null : URL.createObjectURL(icon)} />
          <input
            onChange={(e) => onImageSelect(e)}
            type="file"
            accept="image/*"
            id="upload-photo"
            name="icon"
          />
        </div>
        <p className="subheading handle">{"@" + username}</p>
        <p className="bio">{!bio ? "No bio" : bio}</p>
        <label htmlFor="upload-photo" className="option select-photo-option">
          Upload Photo
        </label>
        <p>Edit Bio</p>
        <TextArea
          name="bio"
          className="bio"
          placeholder="Share something #wicked"
        />
        <Btn type="submit" className="active">
          Update
        </Btn>
      </form>
    </>
  );
}

export default AccountSettings;
