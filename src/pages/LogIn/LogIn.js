import { useState } from "react";
import SignInForm from "../../components/LogInForm/SignInForm";
import SignUpForm from "../../components/LogInForm/SignUpForm";
import "./LogIn.css";
import { logInErrorMessage, signIn, signUp } from "../../login";
import { AuthErrorCodes } from "firebase/auth";
import { currentUser, USER_ERRORS } from "../../user";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  let [warning, setWarning] = useState();

  const onSignUp = (e) => {
    e.preventDefault(); // prevent reloading of page
    setWarning("");

    const formData = new FormData(e.target);
    let username = formData.get("username");
    let email = formData.get("email");
    let password = formData.get("password");

    signUp(username, email, password)
      .then((result) => {
        if (!result) {
          setWarning(logInErrorMessage);
          return;
        }

        navigate("/", { replace: true });
      })
      .catch((e) => {
        switch (e.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            return setWarning("Email already registered.\n");
          default:
            return setWarning("Failed to create new user.\n");
        }
      });
  };

  const onSignIn = (e) => {
    e.preventDefault(); // Prevent page reload
    setWarning("");

    const formData = new FormData(e.target);
    let username = formData.get("username");
    let password = formData.get("password");

    signIn(username, password)
      .then((result) => {
        if (!result) {
          setWarning(logInErrorMessage);
          return;
        }

        navigate("/", { replace: true });
      })
      .catch((e) => {
        switch (e.code) {
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            return setWarning("Incorrect log in details.\n");
          case USER_ERRORS.USER_DATA_NOT_FOUND:
            return setWarning("Username not registered.\n");
          default:
            return setWarning("Failed to sign in.\n");
        }
      });
  };

  let [createNewAccount, setCreateNewAccount] = useState(false);
  const getForm = () => {
    if (createNewAccount) {
      return (
        <SignUpForm
          onSwitch={() => setCreateNewAccount(false)}
          onSubmit={onSignUp}
        />
      );
    }

    return (
      <SignInForm
        onSwitch={() => setCreateNewAccount(true)}
        onSubmit={onSignIn}
      />
    );
  };

  return (
    <div className="page login-page">
      <div className="hero-wrap">
        <p className="heading">youboard.</p>
        <p className="slogan">
          a place to share your <span className="hashtag">#studentliving</span>
        </p>
      </div>
      {getForm()}
      <div className="warning">{warning}</div>
      <p className="subheading watermark">youboard.</p>
    </div>
  );
}

export default LogIn;
