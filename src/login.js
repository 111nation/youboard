import { db } from "./firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { setCurrentUser, User } from "./user";
import { useFormAction } from "react-router-dom";

export let logInErrorMessage = "";

export function validatePassword(password) {
  let valid = true;

  if (password.trim() !== password) {
    valid = false;
    logInErrorMessage += "Remove spaces or tabs in your password.\n";
  }

  if (password.length < 8 || password.length > 32) {
    valid = false;
    logInErrorMessage += "Password must be 8-32 characters long.\n";
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

  if (username.trim() !== username) {
    valid = false;
    logInErrorMessage += "Remove spaces or tabs in your username.\n";
  }

  if (username.length < 3 || username.length > 20) {
    valid = false;
    logInErrorMessage += "Username must be 3-20 characters long.\n";
  }

  // Check if all characters are valid
  // Only invalid if one character doesn't pass check
  let validChars = true;
  const specialChars = ["_", "."];
  for (let x of username) {
    if (x >= "a" && x <= "z") continue;
    if (x >= "0" && x <= "9") continue;
    if (specialChars.includes(x)) continue;

    validChars = false;
  }

  if (!validChars) {
    valid = false;
    logInErrorMessage += "Invalid username.\n";
  }

  return valid;
}

export function isEmail(email) {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  if (
    !validateUsername(username) ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
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
