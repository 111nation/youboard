import { db } from "./firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import {currentUser, setCurrentUser, User} from "./user";

export let logInErrorMessage = "";

export function validatePassword(password) {
	let valid = true;

	let numberPresent = false;
	let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for (let x of password) {
		if (numbers.includes(x)) {
			numberPresent = true;
			break;
		}
	}

	if (password.trim() !== password) {
		valid = false;
		logInErrorMessage += "Remove spaces or tabs in your password.\n";
	}

	if (password.length < 8 || password.length > 16) {
		valid = false;
		logInErrorMessage += "Password must be 8-16 characters long.\n"
	}

	if (!numberPresent) {
		valid = false;
		logInErrorMessage += "Password must contain a number.\n";
	}

	return valid;
}

async function uniqueUsername(username) {
	const q = query(
		collection(db, "users"),
		where("username", "==", username),
		limit(1),
	);
	
	const docs = await getDocs(q);

	// true if unique username
	return docs.empty;
}

export function validateUsername(username) {
	let valid = true; 

	if (username.length < 3 || username.length > 20) {
		valid = false;
		logInErrorMessage += "Username must be 3-20 characters long.\n";
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

	if (!validChars) {
		valid = false;
		logInErrorMessage += "Invalid username.\n";
	}

	return valid;
}

export function isEmail(email) {
	let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(email);
}

export function validateEmail(email) {
	if (!isEmail(email)) {
		logInErrorMessage += "Invalid email address.\n";
		return false;
	}

	return true;
}


export async function validateSignUp(username, email, password) {
	logInErrorMessage = "";

	if (username === "" || email === "" || password === "") {
		logInErrorMessage += "Fill in all the fields.\n";
		return false;
	}

	if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
		return false;
	}

	if (!(await uniqueUsername(username))) {
		logInErrorMessage += "Username has already been registered.\n";
		return false;
	}


	return true;
}

export async function signUp(username, email, password) {
	if (!(await validateSignUp(username, email, password))) {
		return false;
	}

	setCurrentUser(null);
	setCurrentUser(await User.createNewUser(username, email, password));

	return true;
}

export async function signIn(username, password) {
	logInErrorMessage = "";
	if (username === "" || password === "") {
		logInErrorMessage += "Fill in all the fields.\n";
		return false;
	}

	setCurrentUser(null);

	if (isEmail(username)) {
		// Email sign in
		setCurrentUser(await User.signInWithEmail(username, password));
	} else {
		// Username sign in
		setCurrentUser(await User.signInWithUsername(username, password));
	}
	
	return true;
}
