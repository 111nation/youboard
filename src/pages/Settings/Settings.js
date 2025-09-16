import { useState } from "react";
import Btn from "../../components/Buttons/Btn";
import PopUp from "../../components/PopUp/PopUp";
import TopNav from "../../components/TopNav/TopNav";
import "./Settings.css";
import { currentUser } from "../../user";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  let [popup, showPopUp] = useState(false);

  const onSignOut = async () => {
    try {
      await currentUser.signOutUser();
      navigate("/login");
    } catch (e) {
      navigate("/404/Failed to sign out :(");
    }
  };

  return (
    <>
      {popup && (
        <PopUp
          title="No don't leave us!"
          message="Are you sure you want to log out of youboard?"
        >
          <Btn onClick={onSignOut}>Sign Out</Btn>
          <Btn className="active" onClick={() => showPopUp(false)}>
            Cancel
          </Btn>
        </PopUp>
      )}

      <TopNav title="Settings" />
      <div className="settings-wrap">
        <div className="settings-section">
          <p className="hint">General</p>
          <p className="option" onClick={() => navigate("/settings/account")}>
            Account Settings
          </p>
          <p className="option critical" onClick={() => showPopUp(true)}>
            Sign Out
          </p>
        </div>
      </div>
    </>
  );
}

export default Settings;
