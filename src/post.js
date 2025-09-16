import Compressor from "compressorjs";
import { currentUser, USER_ERRORS } from "./user";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { deleteObject, getBlob, ref, uploadBytes } from "firebase/storage";

export const MAX_FILE_SIZE = 3e6;

export const POST_ERRORS = {
  INVALID_FILETYPE: "Invalid filetype",
  IMAGE_PROCESSING_FAILED: "Image processing and compression failed",
  DESCRIPTION_TOO_LONG: "Description is too long",
  URL_TOO_LONG: "URL is too long",
  IMAGE_TOO_LARGE: "Image is too large",
  POST_DOES_NOT_EXIST: "Post does not exists",
};

export async function compressImage(image) {
  let promise = new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.8,
      convertTypes: ["image/png", "image/webp"],
      convertSize: 3e6,
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
    throw { code: POST_ERRORS.IMAGE_PROCESSING_FAILED };
  }
}

export async function getImageFromId(post_id) {
  let imageRef = ref(storage, "images/" + post_id);
  let file = await getBlob(imageRef);
  return file;
}

export async function deletePost(post_id) {
  let imageRef = ref(storage, "images/" + post_id);
  await Promise.all([
    deleteObject(imageRef),
    deleteDoc(doc(db, "posts", post_id)),
  ]);
}

function generateDescriptionKeywords(str) {
  // Create key words to allow indexing
  // Don't create keywords that have spaces

  const words = str
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean); // Remove undefines or empty strings
  let keywords = new Set();

  words.forEach((word) => {
    // A keyword can only be added if:
    // Length is greater than 3
    // Or is not a duplicate
    const trimmed = word.trim();
    for (let i = 0; i < trimmed.length; i++) {
      for (let j = i + 2; j <= trimmed.length; j++) {
        // keywords longer than 3 chars considered
        let keyword = trimmed.substr(i, j);
        keywords.add(keyword);
      }
    }
  });

  return Array.from(keywords);
}

function generateHashtags(str) {
  // Extract hashtags from description
  const words = str
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[^a-zA-Z0-9 #]/g, "")
    .split(" ")
    .filter(Boolean); // Remove undefines or empty strings
  let hashtags = new Set();

  words.forEach((word) => {
    const trimmed = word.trim();
    if (trimmed[0] === "#" && trimmed.length > 1) {
      // Ensure # proceeded with a letter
      hashtags.add(trimmed.substring(1));
    }
  });

  return Array.from(hashtags);
}

export class Post {
  constructor(id, file, description, link, uid, hashtags) {
    this.id = id;
    this.file = file;
    this.description = description;
    this.link = link;
    this.uid = uid;
    this.hashtags = hashtags;
  }

  static async createNew(file, description, link) {
    // Check if firebase storage is full

    if (!file.type.includes("image/"))
      throw { code: POST_ERRORS.INVALID_FILETYPE };
    if (description.length > 200)
      throw { code: POST_ERRORS.DESCRIPTION_TOO_LONG };
    if (link.length > 200) throw { code: POST_ERRORS.URL_TOO_LONG };
    if (!currentUser) throw { code: USER_ERRORS.USER_DATA_NOT_FOUND };

    let compressedFile = await compressImage(file);

    if (compressedFile.size > 3e6) throw { code: POST_ERRORS.IMAGE_TOO_LARGE };

    let hashtags = generateHashtags(description);

    // Create new document
    const docData = {
      uid: currentUser.uid,
      description: description,
      link: link,
      keywords: generateDescriptionKeywords(description),
      hashtags: hashtags,
      createdAt: Timestamp.now(),
    };

    let docRef = await addDoc(collection(db, "posts"), docData);

    try {
      let doc = await getDoc(docRef);
      let imageRef = ref(storage, "images/" + doc.id);
      await uploadBytes(imageRef, compressedFile);
      return new Post(
        doc.id,
        compressedFile,
        description,
        link,
        currentUser.uid,
        hashtags,
      );
    } catch (e) {
      deleteDoc(docRef);
      throw e;
    }
  }

  static async load(post_id) {
    // Get post document
    const docRef = doc(db, "posts", post_id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw { code: POST_ERRORS.POST_DOES_NOT_EXIST };

    let description = docSnap.data().description;
    let link = docSnap.data().link;
    let uid = docSnap.data().uid;
    let hashtags = docSnap.data().hashtags;

    let file = await getImageFromId(post_id);

    return new Post(post_id, file, description, link, uid, hashtags);
  }
}
