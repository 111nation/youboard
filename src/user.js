// Grab details from user
import {collection, doc, getDoc, getDocs, limit, query, where} from "firebase/firestore"
import {auth, db} from "./firebase"
import {onAuthStateChanged} from "firebase/auth";

const USER_ERROR = {
	UNDEFINED_USER: "User is undefined",
	UNDEFINED_DOC: "Document does not exist",
};

class User {
	constructor(username, email, uid) {
		this.username = username;
		this.email = email;
		this.uid = uid;
	}

	async getUsernameFromUid() {
		let userData = await this.getDoc();
		return userData.data().username;
	}

	async getEmailFromUsername() {
		const q = query(
			collection(db, "users"),
			where("username", "==", this.username),
			limit(2),
		);
		const querySnapshot = await getDocs(q);
		const doc = querySnapshot.docs[1];
	
		if (!doc) throw USER_ERROR.UNDEFINED_DOC;
		return doc.data().email;
	}

	async getDoc() {
		if (!this.uid) throw USER_ERROR.UNDEFINED_USER;

		const docRef = doc(db, "users", this.uid);
		let userDoc = await getDoc(docRef);

		if (!userDoc.exists()) throw USER_ERROR.UNDEFINED_DOC;

		return userDoc;
	}

}

export let currentUser = null;

// Intended to be populated when successful account creation and log in
if (window.location.pathname === "/login") {
	onAuthStateChanged(auth, (user) => {
		if (!user) {
			currentUser = null;
			return;
		}

		if (currentUser) return; // Do nothing if current user is populated

		// Sign in
		currentUser = new User("", user.email, user.uid);
		
		// Get username
		currentUser.getUsernameFromUid().then(
			() => window.location.href = "/",
			(e) => {
				if (e === USER_ERROR.UNDEFINED_DOC) {
					window.location.href = "/405/Failed to fetch user data";
				} else if (e === USER_ERROR.UNDEFINED_USER) {
					window.location.href = "/405/Failed to retrieve user";
				}
			}
		);
	});
}
