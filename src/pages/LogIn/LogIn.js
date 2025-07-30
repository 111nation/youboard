import SignInForm from "../../components/LogInForm/SignInForm";
import SignUpForm from "../../components/LogInForm/SignUpForm";
import "./LogIn.css";

function LogIn(props) {
	let page = props.create === false || props.create === undefined ? <SignInForm /> : <SignUpForm />;

	return (
		<div className="page login-page"> 
			<div className="hero-wrap">
				<p className="heading">youboard.</p>
				<p className="slogan">a place to share your <span className="hashtag">#studentliving</span></p>
			</div>
			{page}
			<p className="subheading watermark">youboard.</p>
		</div>
	);
}

export default LogIn;
