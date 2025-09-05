import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function checkPassword(password) {
	// Recieves password
	// Checks if password abides to password rules
	// Return JSX to indicate error message to be displayed.
	let numberPresent = false;
	let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for (let x of password) {
		if (numbers.includes(x)) {
			numberPresent = true;
			break;
		}
	}

	if (password.trim() !== password) {
		return "Remove spaces or tabs in your password.\n";
	}

	if (password.length < 8 || password.length > 16) {
		return "Password must be 8-16 characters long.\n"
	}

	if (!numberPresent) {
		return "Password must contain a number.\n";
	}

	return "";
}


export function checkUsername(username) {
	if (username.length < 3 || username.length > 10) {
		return "Username must be 3-10 characters long.\n";
	}

	// Check if all characters are valid
	// Only invalid if one character doesn't pass check
	let validChars = true;
	const specialChars = ['_', '.'];
	for (let x of username) {
		if (x >= 'a' && x <= 'z') continue;
		if (x >= '0' && x <= '9') continue;
		if (specialChars.includes(x)) continue

		validChars = false;
	}

	if (validChars === false) {
		return "Invalid username.\n";
	}

	return "";
}

export function checkEmail(email) {
	const validateEmail = (email) => {
	  return String(email)
		.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	if (!validateEmail(email)) {
		return "Invalid email address.\n";
	}

	return "";
}


export function signUp(username, email, password) {
	username = username.toLowerCase();
	email = email.toLowerCase();
	// Successful - No warning generated
	// Unsuccessful - Warning generated
	let warning = "";

	if (username === "" || email === "" || password === "") {
		warning = "Fill in all the fields.\n";
		return warning;
	}

	warning += checkUsername(username);
	warning += checkEmail(email);
	warning += checkPassword(password);

	if (warning === "") {
		console.log("Hello!");
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up 
			const user = userCredential.user;
			window.location.href = "/login";
		})
		.catch((error) => {
			const errorMessage = error.message;
			warning = errorMessage;
		});
	}

	return warning;
}
