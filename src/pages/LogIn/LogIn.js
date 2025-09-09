import {useState} from "react";
import SignInForm from "../../components/LogInForm/SignInForm";
import SignUpForm from "../../components/LogInForm/SignUpForm";
import "./LogIn.css";
import {isEmail, logInErrorMessage, validateSignUp} from "../../rules";


function LogIn() {
	let [warning, setWarning] = useState();

	const onSignUp = (e) => {
		e.preventDefault(); // prevent reloading of page
		setWarning("");
		
		const formData = new FormData(e.target);
		let username = formData.get("username");
		let email = formData.get("email");
		let password = formData.get("password"); 

		validateSignUp(username, email, password).then(
			(valid) => {
				// Display log in error
				if (!valid) {
					setWarning(logInErrorMessage);
				} 

				// Create new user
			},
		);
	}

	const onSignIn = (e) => {
		e.preventDefault(); // Prevent page reload	
		setWarning("");

		const formData = new FormData(e.target);
		let username =  formData.get("username");
		let password = formData.get("password");

		if (username === "" || password === "") {
			setWarning("Fill in all the fields.\n");
			return;
		}

		if (isEmail(username)) {
			// Email sign in
		} else {
			// Username sign in
		}
	}

	let [createNewAccount, setCreateNewAccount] = useState(false);
	const getForm = () => {
		if (createNewAccount) {
			return <SignUpForm onSwitch={() => setCreateNewAccount(false)} onSubmit={onSignUp}/>;
		}
		
		return <SignInForm onSwitch={() => setCreateNewAccount(true)} onSubmit={onSignIn} />;
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
