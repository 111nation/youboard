import "./LogIn.css";
import Edit from "../Edits/Edit";
import Btn from "../Buttons/Btn";

function SignInForm() {
	return (
		<div className="form">
			<Edit placeholder="Username" /> 
			<Edit type="password" placeholder="Password" />
			<div className="btn-wrap">
				<Btn>New Account</Btn>
				<Btn className="active">Enter</Btn>
			</div>
		</div>
	);
}

export default SignInForm;
