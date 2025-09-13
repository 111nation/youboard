import {addDoc, and, collection, deleteDoc, doc, getDocs, limit, or, query, where} from "firebase/firestore";
import {db} from "./firebase";
import {User} from "./user";


export async function isFollowing(target_uid, follower_uid) {
	if (!target_uid || !follower_uid) return false;

	const q = query(
		collection(db, "follows"),
		or( 
			and(
				where("follower_uid", "==", target_uid), 
				where("target_uid", "==", follower_uid),
			),
			and(
				where("target_uid", "==", target_uid), 
				where("follower_uid", "==", follower_uid),
			),
		), 
		limit(1),
	);


	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
}

export async function follow(target_uid, follower_uid) {
	if (await isFollowing(target_uid, follower_uid)) return;

	// Check if user's document exists
	await User.getFromUid(target_uid);
	await User.getFromUid(follower_uid);


	const docData = {
		target_uid: target_uid,
		follower_uid: follower_uid,
	}

	await addDoc(collection(db, "follows"), docData);
}

export async function unfollow(target_uid, follower_uid) {
	const collectionRef = collection(db, "follows");

	const q = query(
		collectionRef,
		where("target_uid", "==", target_uid), 
		where("follower_uid", "==", follower_uid),
		limit(1),
	);

	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) return;

	const docRef = doc(collectionRef, querySnapshot.docs[0].id);

	await deleteDoc(docRef);
}

export async function followers(target_uid) {
	// Get all followers uid
	const q = query(
		collection(db, "follows"),
		where("target_uid", "==", target_uid), 
	);

	const querySnapshot = await getDocs(q);

	const usersList = await Promise.all(
		querySnapshot.docs.map(doc => User.getFromUid(doc.data().follower_uid))
	);

	return usersList;
}

export async function numFollowers(target_uid) {
	// Get followers count
	const q = query(
		collection(db, "follows"),
		where("target_uid", "==", target_uid), 
	);

	const querySnapshot = await getDocs(q);

	return querySnapshot.size;
}

export async function following(target_uid) {
	// Get all following uid
	const q = query(
		collection(db, "follows"),
		where("follower_uid", "==", target_uid), 
	);

	const querySnapshot = await getDocs(q);

	const usersList = await Promise.all(
		querySnapshot.docs.map(doc => User.getFromUid(doc.data().target_uid))
	);

	return usersList;
}

export async function numFollowing(target_uid) {
	// Get all following count
	const q = query(
		collection(db, "follows"),
		where("follower_uid", "==", target_uid), 
	);

	const querySnapshot = await getDocs(q);

	return querySnapshot.size;
}

export async function followersAndFollowing(target_uid) {
	const [followers_list, following_list] = await Promise.all([
		followers(target_uid),
		following(target_uid),
	]);

	return [followers_list, following_list];
}

export async function followersAndFollowingCount(target_uid) {
	const [num_followers, num_following] = await Promise.all([
		numFollowers(target_uid),
		numFollowing(target_uid),
	]);
	return [num_followers, num_following];
}
