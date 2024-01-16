import firebase_app from "../init";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
