import Btn from "../../components/Buttons/Btn";
import TextArea from "../../components/Edits/TextArea";
import TopNav from "../../components/TopNav/TopNav";
import "./Settings.css";

function AccountSettings() {
  return (
    <>
      <TopNav title="Account Settings" />
      <form className="account-settings-page">
        <div className="profile"></div>
        <p className="subheading handle">@sadboy</p>
        <p className="bio">I am just a sad boy</p>
        <label className="option select-photo-option">Upload Photo</label>
        <p>Edit Bio</p>
        <TextArea
          name="description"
          className="upload-desc"
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
