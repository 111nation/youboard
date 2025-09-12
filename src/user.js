import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth, db} from "./firebase";
import {doc, getDoc, getDocs, setDoc, query, limit, where, collection} from "firebase/firestore";
import {followersAndFollowingCount} from "./follow";

/* TODO: 
 * Error handling for when NULL document returned
 */

async function getDocFromUsername(username) {
	const q = query(
		collection(db, "users"),
		where("username", "==", username),
		limit(1),
	);
	
	const querySnapshot = await getDocs(q); // Doc can be empty
	
	if (querySnapshot.empty) {
		return null;
	}

	return querySnapshot.docs[0];
}

export const USER_ERRORS = {
	USER_DATA_NOT_FOUND: "User data not found",
};

export class User {
	constructor(uid, username, email, userDoc) {
		this.uid = uid;
		this.username = username;
		this.email = email;
		this.userDoc = userDoc;
	}

	static async createNewUser(username, email, password) {
		let userCred = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCred.user;

		const docRef = doc(db, "users", user.uid);
		await setDoc(docRef, {
			username: username,
			email: email,
		});
		const userDoc = await getDoc(docRef);

		return new User(user.uid, username, email, userDoc, [], []);
	}

	static async signInWithEmail(email, password) {
		let userCred = await signInWithEmailAndPassword(auth, email, password);
		const user = userCred.user;
		const userDoc = await getDoc(doc(db, "users", user.uid)); 
		const username = userDoc.data().username;

		return new User(user.uid, username, email, userDoc);
	}

	static async signInWithUsername(username, password) {
		const userDoc = await getDocFromUsername(username);
		if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

		const email = userDoc.data().email;
	
		let userCred = await signInWithEmailAndPassword(auth, email, password);
		const user = userCred.user;

		return new User(user.uid, username, email, userDoc);
	}

	/* Initialize non logged in user
	 * Used to grab other user's data
	 */

	static async getFromUid(uid) {
		const userDoc = await getDoc(doc(db, "users", uid));
		if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

		const username = userDoc.data().username;
		const email = userDoc.data().email;

		return new User(uid, username, email, userDoc);
	}

	static async getFromUsername(username) {
		const userDoc = await getDocFromUsername(username);
		if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

		const email = userDoc.data().email;
		const uid = userDoc.id;

		return new User(uid, username, email, userDoc);
	}

	async signOutUser() {
		if (currentUser.uid !== this.uid) return;
		
		await signOut(auth);
		localStorage.removeItem("currentUser");
	}
};

export let currentUser = getCurrentUserFromLocalStorage();

// Retrieve current logged in user from local storage
// Ensure the user there matches user from firebase
function getCurrentUserFromLocalStorage() {
	let localStorageUser = JSON.parse(localStorage.getItem("currentUser"));
	const user = auth.currentUser;

	if (!localStorageUser) return null;

	if (user && user.uid === localStorageUser.uid) {
		return null;
	}

	return new User(
		localStorageUser.uid,
		localStorageUser.username,
		localStorageUser.email,
		localStorageUser.userDoc || null
	);
}

export function setCurrentUser(x) {
	currentUser = x;
	
	// Save user to localStorage
	localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
