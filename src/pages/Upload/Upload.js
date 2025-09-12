import {useState} from "react";
import Btn from "../../components/Buttons/Btn";
import Edit from "../../components/Edits/Edit";
import TextArea from "../../components/Edits/TextArea";
import TopNav from "../../components/TopNav/TopNav";
import "./Upload.css";
import {Post} from "../../post";

const onSumbit = async (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	let photo = formData.get("photo");
	let description = formData.get("description");
	let link = formData.get("link");

	if (!photo) return;

	try {
		await Post.createNew(photo, description, link);
		window.location.href = "/";
	} catch (e) {
		console.log(e.code);
		window.location.href = "/404/" + e.code;
	}
}

function Upload() {
	let [preview, setPreview] = useState("");

	const onImageSelect = async (e) => {
		let photo = e.target.files[0];
		if (!photo) return;

		setPreview(URL.createObjectURL(photo));
	}

	return (
		<>
		<TopNav title="Upload"/>
		<form onSubmit={(e) => onSumbit(e)} className="upload-wrap">
			<div className="upload-photo">
				<img src={preview} />
				<input onChange={(e) => onImageSelect(e)} type="file" accept="image/*" id="upload-photo" name="photo"/>
			</div>
			<label for="upload-photo" className="option select-photo-option">Select Photo</label>
			<TextArea name="description" className="upload-desc" placeholder="Share something #wicked" />
			<p>Link a website</p>
			<Edit name="link" placeholder="https://example.com" type="url" />
			<Btn type="submit" className="active">Post</Btn>
		</form>
		</>
	);
}

export default Upload;
