import firebase_app from "../init";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function forgetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}
