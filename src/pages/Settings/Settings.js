import TopNav from "../../components/TopNav/TopNav";
import "./Settings.css";

function Settings() {
	return (
		<>
			<TopNav title="Settings"/>
			<div className="settings-wrap"> 
				<div className="settings-section">
					<p className="hint">General</p>
					<p className="option">Account Details</p>
					<p className="option critical">Sign Out</p>
				</div>
			</div>
		</>
	);
}

export default Settings;
