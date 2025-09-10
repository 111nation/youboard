import Btn from "../../components/Buttons/Btn";
import Edit from "../../components/Edits/Edit";
import TextArea from "../../components/Edits/TextArea";
import TopNav from "../../components/TopNav/TopNav";
import "./Upload.css";

function Upload() {
	return (
		<>
		<TopNav title="Upload"/>
		<div className="upload-wrap">
			<div className="upload-photo"></div>
			<p className="option select-photo-option">Select Photo</p>
			<TextArea className="upload-desc" placeholder="Share something #wicked" />
			<p>Link a website</p>
			<Edit placeholder="https://example.com" type="url" />
			<Btn className="active">Post</Btn>
		</div>
		</>
	);
}

export default Upload;
