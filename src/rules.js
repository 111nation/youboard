import { db } from "./firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

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
		return false;
	}

	return true;
}

/*export function signUp(username, email, password) {
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

	async function createNewUserEmailAndPassword() {
		try {
			let success = await uniqueUsername(username);
			if (!success) return "Username in use.\n";

			await createUserWithEmailAndPassword(auth, email, password);
			// Add user details to database
			const data = {
				username: username,
				email: email,
			};

			let documentPath = "users/" + auth.currentUser.uid;
			const userDocument = doc(db, documentPath);
			await setDoc(userDocument, data);
		} catch (err) {
			const errorCode = err.code;

			if (errorCode === "auth/email-already-in-use") return "Email already registered.\n";
			return "Failed to create new user.\n";
		}

		if (!auth.currentUser) return "Failed to create new user.\n";

		window.location.href = "/";
		return "";
	}

	if (warning === "") {
		warning = createNewUserEmailAndPassword();
	}

	return warning;
}

async function getEmailFromUsername(username) {
		const q = query(
			collection(db, "users"),
			where("username", "==", username),
			limit(1),
		);
		
		const querySnapshot = await getDocs(q);
		const doc = querySnapshot.docs[0];
	
		if (doc === undefined) {
			return "";
		} else {
			return doc.data().email;
		}
}

export function signIn(username, password) {
	// Sign in already created user
	// Username can also be email
	
	// Determine if email or username given
	const emailCheck = (email) => {
		let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
		return regex.test(email);
	};

	let isEmail = emailCheck(username);
	let email = username;

	async function attemptToSignIn() {
		try {
			// Get user's email if username entered
			if (!isEmail) {
				email = await getEmailFromUsername(username);
				if (email === "") return "Username not registered.\n";
			}

			await signInWithEmailAndPassword(auth, email, password);
			window.location.href = "/";
			return "";
		} catch (e) {
			const errorCode = e.code;
			if (errorCode == "auth/invalid-credential") return "Account details are incorrect.\n";
			return "Failed to sign in.\n";
		}
	}

	return attemptToSignIn();
}*/
