import Compressor from 'compressorjs';
import {currentUser, USER_ERRORS} from './user';
import {addDoc, collection, deleteDoc, doc, getDoc} from 'firebase/firestore';
import {db, storage} from './firebase';
import {getBlob, ref, uploadBytes} from 'firebase/storage';

export const MAX_FILE_SIZE = 3e6;

export const POST_ERRORS = {
	INVALID_FILETYPE: "Invalid filetype",
	IMAGE_PROCESSING_FAILED: "Image processing and compression failed",
	DESCRIPTION_TOO_LONG: "Description is too long",
	URL_TOO_LONG: "URL is too long",
	IMAGE_TOO_LARGE: "Image is too large",
	POST_DOES_NOT_EXIST: "Post does not exists",
}

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
			}
		});
	});

	try {
		return await promise;
	} catch (_) {
		throw { code: POST_ERRORS.IMAGE_PROCESSING_FAILED };
	}
}

export class Post {
	constructor(file, description, link, uid) {
		this.file = file;
		this.description = description;
		this.link = link;
		this.uid = uid;
	}

	static async createNew(file, description, link) {
		// Check if firebase storage is full

		if (!file.type.includes("image/")) throw { code: POST_ERRORS.INVALID_FILETYPE };
		if (description.length > 200) throw { code: POST_ERRORS.DESCRIPTION_TOO_LONG };
		if (link.length > 200) throw {code: POST_ERRORS.URL_TOO_LONG };
		if (!currentUser) throw {code: USER_ERRORS.USER_DATA_NOT_FOUND };

		let compressedFile = await compressImage(file);

		if (compressedFile.size > 3e6) throw {code: POST_ERRORS.IMAGE_TOO_LARGE };

		// Create new document
		const docData = {
			uid: currentUser.uid,
			description: description,
			link: link,
		}

		let docRef = await addDoc(collection(db, "posts"), docData);

		try {
			let doc = await getDoc(docRef);
			let imageRef = ref(storage, "images/" + doc.id);
			await uploadBytes(imageRef, compressedFile);
			return new Post(compressedFile, description, link, currentUser.uid);
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

		let imageRef = ref(storage, "images/" + docSnap.id);
		let file = await getBlob(imageRef);

		return new Post(file, description, link, uid);
	}
};
