import "./LogIn.css";
import Edit from "../Edits/Edit";
import Btn from "../Buttons/Btn";

function SignInForm(props) {
	return (
		<form onSubmit={props.onSubmit} className="form">
			<Edit name="username" placeholder="Username or Email" /> 
			<Edit name="password" type="password" placeholder="Password" />
			<div className="btn-wrap">
				<Btn onClick={props.onSwitch}>New Account</Btn>
				<Btn type="submit" className="active">Enter</Btn>
			</div>
		</form>
	);
}

export default SignInForm;
