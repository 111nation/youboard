import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { currentUser } from "./user";

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
    return doc.data().username;
  });

  const notCurrentUser = (val) => {
    return val !== currentUser.username;
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

  const result = querySnapshot.docs;
  return result;
}
