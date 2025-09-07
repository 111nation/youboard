import {useState} from "react";
import SignInForm from "../../components/LogInForm/SignInForm";
import SignUpForm from "../../components/LogInForm/SignUpForm";
import "./LogIn.css";
import {signIn, signUp} from "./rules";


function LogIn() {
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

		let msg = signUp(user.username, user.email, user.password);
		setWarning(msg);
	}

	const handleSignIn = (e) => {
		e.preventDefault(); // Prevent page reload	
		setWarning("");

		const form = e.target;
		const formData = new FormData(form);
		const credentials = {
			username: formData.get("username"),
			password: formData.get("password"),
		};


		let msg = signIn(credentials.username, credentials.password);
		setWarning(msg);
	}

	let [createNewAccount, setCreateNewAccount] = useState(false);//<SignUpForm onSubmit={handleSignUp}/>);
	const getForm = () => {
		if (createNewAccount) {
			return <SignUpForm onSwitch={() => setCreateNewAccount(false)} onSubmit={handleSignUp}/>;
		}
		
		return <SignInForm onSwitch={() => setCreateNewAccount(true)} onSubmit={handleSignIn} />;
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
