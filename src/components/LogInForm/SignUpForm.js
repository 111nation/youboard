import Btn from "../Buttons/Btn";
import Edit from "../Edits/Edit";
import "./LogIn.css";

function SignUpForm(props) {
	return (
		<form onSubmit={props.onSubmit} className="form">
			<Edit name="username" placeholder="Username" /> 
			<Edit name="email" type="email" placeholder="Email" />
			<Edit name="password" type="password" placeholder="Password" />
			<div className="btn-wrap">
				<Btn onClick={props.onSwitch}>Existing Account</Btn>
				<Btn type="submit" className="active">Create</Btn>
			</div>
		</form>
	);
}

export default SignUpForm;
