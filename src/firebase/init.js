import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);

export default firebase_app;
