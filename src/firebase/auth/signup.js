import firebase_app from "../init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
