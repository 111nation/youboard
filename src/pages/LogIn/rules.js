export function checkPassword(password) {
	// Recieves password
	// Checks if password abides to password rules
	// Return JSX to indicate error message to be displayed.
	let warning = "";

	let numberPresent = false;
	let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for (let x of password) {
		if (numbers.includes(x)) {
			numberPresent = true;
			break;
		}
	}

	if (password.trim() !== password) {
		warning += "Remove spaces or tabs in your password.\n";
	}

	if (password.length < 8 || password.length > 12) {
		warning += "Password must be 8-12 characters long.\n"
	}



	if (!numberPresent) {
		warning += "Password must contain a number.\n";
	}

	return warning;
}


export function checkUsername(username) {
	let warning = "";

	if (username.length < 3 || username.length > 10) {
		warning += "Username must be 3-10 characters long";
	}

	return warning;
}
