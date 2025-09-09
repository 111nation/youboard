import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "./firebase";
import {doc, setDoc} from "firebase/firestore";

class User {
	constructor(uid, username, email, docRef) {
		this.uid = uid;
		this.username = username;
		this.email = email;
		this.docRef = docRef;
	}

	static async createNewUser(username, email, password) {
		let userCred = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCred.user;

		const docRef = doc(db, "users", user.uid);
		await setDoc(docRef, {
			username: username,
			email: email,
		});

		return new User(uid, username, email, docRef);
	}

	static async signInWithUsername(username, password) {
		
	}
};
