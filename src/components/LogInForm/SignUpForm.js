import Btn from "../Buttons/Btn";
import Edit from "../Edits/Edit";
import "./LogIn.css";

function SignUpForm() {
	return (
		<div className="form">
			<Edit placeholder="Username" /> 
			<Edit type="email" placeholder="Email" />
			<Edit type="password" placeholder="Password" />
			<div className="btn-wrap">
				<Btn>Existing Account</Btn>
				<Btn className="active">Create</Btn>
			</div>
		</div>
	);
}

export default SignUpForm;
