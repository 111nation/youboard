// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqYacd_bVBYSpO32-29U3DB43MrWErG44",
  authDomain: "youboard-88661.firebaseapp.com",
  projectId: "youboard-88661",
  storageBucket: "youboard-88661.firebasestorage.app",
  messagingSenderId: "626670720462",
  appId: "1:626670720462:web:a1dacae81beb7401c1c79f",
  measurementId: "G-M5HKYZCSEL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);


