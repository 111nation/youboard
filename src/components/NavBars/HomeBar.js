import {useState} from "react";
import {currentUser} from "../../user";
import PopUp from "../PopUp/PopUp";
import NavBar from "./NavBar";
import "./NavBar.css";
import {Link} from "react-router-dom";
import Btn from "../Buttons/Btn";


function HomeBar(props) {
	let icon_color = Array(3).fill("#F9F9F9");
	let selected = props.index === undefined || props.index >= 3 || props.index < 0 ? -1 : props.index;
	icon_color[selected] = "#FF0048";
	let [popup, setPopUp] = useState(<></>);

	const loadingPopUp = () => {
		return (
			<PopUp 
				title="Loading your story!" 
				message="Loading your profile" 
				loader={true} 
			/>
		);
	}

	const errorPopUp = () => {
		return (
			<PopUp
				title="Not signed in!"
				message="You need to sign in to access your board.">
				<Btn className="active" onClick={() => window.location.href = "/login"}>Sign In</Btn>
				<Btn onClick={() => setPopUp(<></>)}>Close</Btn>
			</PopUp>
		);
	}

	const openProfile = async () => {
		// Attempt to open user profile
		// Opens if user loaded otherwise do nothing
		if (selected === 2) return; // Do nothing if already on page
		setPopUp(loadingPopUp());

		if (currentUser) {
			window.location.href = "/@" + currentUser.username;
		} else {
			setPopUp(errorPopUp());
		}
	}

	const openHome = () => {
		if (selected === 0) return;
		window.location.href = "/";
	}

	const openUpload = () => {
		if (selected === 1) return;
		window.location.href = "/upload";
	}

	return (
	<>
		{popup}
		<NavBar className="homebar">
			<svg onClick={openHome} className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g id="Navigation / House_01">
				<path id="Vector" d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" strokeWidth="1.45" strokeLinecap="round" stroke={icon_color[0]} strokeLinejoin="round"/>
				</g>
			</svg>

			<svg onClick={openUpload} className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M14.8814 4.5H9.11862L7.46862 7.03125H3.75L3 7.78125V18.75L3.75 19.5H20.25L21 18.75V7.78125L20.25 7.03125H16.5314L14.8814 4.5ZM8.28138 8.53125L9.93138 6H14.0686L15.7186 8.53125H19.5V18H4.5V8.53125H8.28138ZM9.75 12.75C9.75 11.5074 10.7574 10.5 12 10.5C13.2426 10.5 14.25 11.5074 14.25 12.75C14.25 13.9926 13.2426 15 12 15C10.7574 15 9.75 13.9926 9.75 12.75ZM12 9C9.92893 9 8.25 10.6789 8.25 12.75C8.25 14.8211 9.92893 16.5 12 16.5C14.0711 16.5 15.75 14.8211 15.75 12.75C15.75 10.6789 14.0711 9 12 9Z" fill={icon_color[1]}/>
			</svg>

			<img onClick={openProfile} style={{borderColor: icon_color[2]}} className="profile"/>
		</NavBar>
	</>
	);
}

export default HomeBar;
