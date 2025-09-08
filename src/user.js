// Grab details from user
import {doc, getDoc} from "firebase/firestore"
import {db} from "./firebase"

export async function getUsername(uid) {
	// Retreive username from user id
	// Get corresponding document from uid from firestore database 
	if (uid === null || uid === undefined) return "";

	const userData = await getDoc(doc(db, "users", uid));

	if (!userData.exists()) return ""; // User does not exist

	return userData.data().username;
}
