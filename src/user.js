import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "./firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";

/* TODO: 
 * Error handling for when NULL document returned
 */

async function getDocFromUsername(username) {
	const q = query(
		collection(db, "users"),
		where("username", "==", username),
		limit(1),
	);
	
	const docs = await getDocs(q); // Doc can be empty

	return docs[0];
}

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

		return new User(user.uid, username, email, userDoc);
	}

	static async signInWithEmail(email, password) {
		let userCred = await signInWithEmailAndPassword(auth, email, password);
		const user = userCred.user;
		const docRef = doc(db, "users", user.uid);
		const userDoc = await getDoc(docRef); // Possible error that doc is empty
		const username = docRef.data().username;

		return new User(user.uid, username, email, userDoc);
	}

	static async signInWithUsername(username, password) {
		const userDoc = await getDocFromUsername(username);
		const email = userDoc.data().email;
	
		let userCred = await signInWithEmailAndPassword(auth, email, password);
		const user = userCred.user;

		return new User(user.uid, username, email, userDoc);
	}

	/* Initialize non logged in user
	 * Used to grab other user's data
	 */

	static async getFromUid(uid) {
		const docRef = doc(db, "users", uid);
		const userDoc = await getDoc(docRef); // Possible error that doc is empty
		const username = userDoc.data().username;
		const email = userDoc.data().email;

		return new User(uid, username, email, userDoc);
	}

	static async getFromUsername(username) {
		const userDoc = await getDocFromUsername(username); // Possible error that doc is empty
		const email = userDoc.data().email;
		const uid = userDoc.id;

		return new User(uid, username, email, userDoc);
	}
};

