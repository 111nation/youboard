import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { currentUser, User } from "./user";
import { getImageFromId, Post } from "./post";

export async function searchForProfiles(searchQuery) {
  if (searchQuery.trim() !== searchQuery) return;
  if (searchQuery[0] === "@") searchQuery = searchQuery.substring(1);

  const q = query(
    collection(db, "users"),
    where("username", ">=", searchQuery),
    where("username", "<=", searchQuery + "\uf8ff"),
    limit(10),
  );

  const querySnapshot = await getDocs(q);

  const result = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return new User(doc.id, data.username, data.email, doc);
  });

  const notCurrentUser = (user) => {
    return user.username !== currentUser.username;
  };

  return result.filter(notCurrentUser);
}

export async function searchForPosts(searchQuery) {
  const words = searchQuery
    .toLowerCase()
    .replace(/\n/g, " ")
    .split(" ")
    .filter(Boolean); // Remove undefines or empty strings

  const q = query(
    collection(db, "posts"),
    where("keywords", "array-contains-any", words),
    limit(100),
  );

  const querySnapshot = await getDocs(q);

  // Return result as object of Post class
  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      let image = await getImageFromId(doc.id);
      return new Post(doc.id, image, data.description, data.link, data.uid);
    }),
  );

  return result;
}

export async function getHomePosts() {
  const q = query(collection(db, "posts"), limit(100), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);

  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      let image = await getImageFromId(doc.id);
      return new Post(doc.id, image, data.description, data.link, data.uid);
    }),
  );

  return result;
}

export async function getUserPosts(uid) {
  const q = query(collection(db, "posts"), where("uid", "==", uid), limit(50));
  const querySnapshot = await getDocs(q);

  // Return result as array of Post class's objects
  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      let image = await getImageFromId(doc.id);
      return new Post(doc.id, image, data.description, data.link, data.uid);
    }),
  );

  return result;
}
