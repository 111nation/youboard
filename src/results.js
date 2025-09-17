import {
  collection,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { currentUser, getProfilePhoto, User } from "./user";
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

  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      return new User(
        doc.id,
        data.username,
        data.email,
        doc,
        await getProfilePhoto(doc.id),
        data.bio,
      );
    }),
  );

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
  let q;

  if (currentUser) {
    q = query(
      collection(db, "posts"),
      where("uid", "!=", currentUser.uid),
      orderBy("uid"),
      orderBy("createdAt", "desc"),
      limit(100),
    );
  } else {
    q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(100),
    );
  }
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
  const q = query(
    collection(db, "posts"),
    where("uid", "==", uid),
    orderBy("uid"),
    orderBy("createdAt", "desc"),
    limit(50),
  );
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

export async function getRelatedPosts(post) {
  const conditions = [];
  const differentPosts = (val) => {
    return val.id !== post.id;
  };

  if (post.hashtags.length > 0) {
    conditions.push(
      where("hashtags", "array-contains-any", post.hashtags.slice(0, 10)),
    );
  }

  if (post.keywords.length > 0) {
    conditions.push(
      where("keywords", "array-contains-any", post.keywords.slice(0, 20)),
    );
  }

  if (conditions.length === 0) return [];

  const q = query(collection(db, "posts"), or(...conditions), limit(100));
  const querySnapshot = await getDocs(q);

  // If no related posts just load recent
  /*if (querySnapshot.empty) {
    const result = await getHomePosts();
    return result.filter(differentPosts);
  }*/

  // Return result as array of Post class's objects
  const result = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      let image = await getImageFromId(doc.id);
      return new Post(doc.id, image, data.description, data.link, data.uid);
    }),
  );

  return result.filter(differentPosts);
}
