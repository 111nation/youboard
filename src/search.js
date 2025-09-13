import { collection, getDocs, limit, query, where } from "firebase/firestore"
import {db} from "./firebase";

export async function searchForProfiles (searchQuery) { 
	if (searchQuery.trim() !== searchQuery) return;
	if (searchQuery[0] === "@") searchQuery = searchQuery.substring(1); 

	const q = query(
		collection(db, "users"),
		where("username", ">=", searchQuery),
		where("username", "<=", searchQuery + "\uf8ff"),
		limit(10),
	);

	const querySnapshot = await getDocs(q);

	const result = querySnapshot.docs.map(doc => doc.data().username);
	return result;
}
