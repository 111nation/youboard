import {useEffect, useState} from "react";
import SignInForm from "../../components/LogInForm/SignInForm";
import SignUpForm from "../../components/LogInForm/SignUpForm";
import "./LogIn.css";
import {checkPassword, checkUsername} from "./rules";
import {createEvent} from "@testing-library/dom";

function LogIn(props) {
	let [warning, setWarning] = useState();

	const handleSignUp = (e) => {
		e.preventDefault(); // prevent reloading of page
		setWarning("");
		
		const form = e.target;
		const formData = new FormData(form);
		const user = {
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
		};

		let msg = "";
		if (user.username === "" || user.email === "" || user.password === "") {
			msg = "Fill in all the fields.\n";
		}

		msg += checkPassword(user.password);
		msg += checkUsername(user.username);

		setWarning(msg);
	}

	let [createNewAccount, setCreateNewAccount] = useState(false);//<SignUpForm onSubmit={handleSignUp}/>);
	const getForm = () => {
		if (createNewAccount) {
			return <SignUpForm onSwitch={() => setCreateNewAccount(false)} onSubmit={handleSignUp}/>;
		}
		
		return <SignInForm onSwitch={() => setCreateNewAccount(true)} />;
	}

	return (
		<div className="page login-page"> 
			<div className="hero-wrap">
				<p className="heading">youboard.</p>
				<p className="slogan">a place to share your <span className="hashtag">#studentliving</span></p>
			</div>
			{getForm()}
			<div className="warning">
				{warning}
			</div>
			<p className="subheading watermark">youboard.</p>
		</div>
	);
}

export default LogIn;
