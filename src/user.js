import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Compressor from "compressorjs";
import { auth, db, storage } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  limit,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getBlob, ref, uploadBytes } from "firebase/storage";

export const USER_ERRORS = {
  USER_DATA_NOT_FOUND: "User data not found",
  PROFILE_INVALID_FILETYPE: "Profile icon is in an invalid filetype",
  PROFILE_TOO_LARGE: "Profile icon is too large!",
  IMAGE_PROCESSING_FAILED: "Image processing failed!",
};

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

async function compressImage(image) {
  let promise = new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.4,
      convertTypes: ["image/png", "image/webp"],
      convertSize: 1e6,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });

  try {
    return await promise;
  } catch (_) {
    throw { code: USER_ERRORS.IMAGE_PROCESSING_FAILED };
  }
}

export async function changeProfilePhoto(uid, file) {
  if (!uid) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };
  if (!file.type.includes("image/"))
    throw { code: USER_ERRORS.PROFILE_INVALID_FILETYPE };

  let compressedFile = await compressImage(file);
  if (compressedFile.size > 5e5) throw { code: USER_ERRORS.PROFILE_TOO_LARGE };

  // Upload file and update user doc
  let imageRef = ref(storage, "profiles/" + uid);

  uploadBytes(imageRef, compressedFile);
}

export async function getProfilePhoto(uid) {
  // Try get user profile icon otherwise return a null profile icon
  let imageRef = ref(storage, "profiles/" + uid);
  try {
    return await getBlob(imageRef);
  } catch (e) {
    return null;
  }
}

export class User {
  constructor(uid, username, email, userDoc, icon, bio) {
    this.uid = uid;
    this.username = username;
    this.email = email;
    this.userDoc = userDoc;
    this.icon = icon;
    this.bio = bio;
  }

  static async createNewUser(username, email, password) {
    let userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      username: username,
      email: email,
      bio: "",
      icon: null,
    });
    const userDoc = await getDoc(docRef);

    return new User(user.uid, username, email, userDoc, null, "");
  }

  static async signInWithEmail(email, password) {
    let userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.data().username;
    const icon = await getProfilePhoto(user.uid);
    const bio = userDoc.data().bio;

    return new User(user.uid, username, email, userDoc, icon, bio);
  }

  static async signInWithUsername(username, password) {
    const userDoc = await getDocFromUsername(username);
    if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

    const email = userDoc.data().email;

    let userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const icon = await getProfilePhoto(user.uid);
    const bio = await userDoc.data().bio;

    return new User(user.uid, username, email, userDoc, icon, bio);
  }

  /* Initialize non logged in user
   * Used to grab other user's data
   */

  static async getFromUid(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

    const username = userDoc.data().username;
    const email = userDoc.data().email;
    const icon = await getProfilePhoto(uid);
    const bio = await userDoc.data().bio;

    return new User(uid, username, email, userDoc, icon, bio);
  }

  static async getFromUsername(username) {
    const userDoc = await getDocFromUsername(username);
    if (!userDoc) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

    const email = userDoc.data().email;
    const uid = userDoc.id;
    const icon = await getProfilePhoto(uid);
    const bio = await userDoc.data().bio;

    return new User(uid, username, email, userDoc, icon, bio);
  }

  async signOutUser() {
    if (currentUser.uid !== this.uid) return;

    await signOut(auth);
    localStorage.removeItem("currentUser");
  }
}

export let currentUser = await getCurrentUserFromLocalStorage();

// Retrieve current logged in user from local storage
// Ensure the user there matches user from firebase
async function getCurrentUserFromLocalStorage() {
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
    localStorageUser.userDoc || null,
    await getProfilePhoto(localStorageUser.uid),
    localStorageUser.bio || null,
  );
}

export function setCurrentUser(x) {
  currentUser = x;

  // Save user to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
