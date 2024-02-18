import firebase_app from "../init";
import { confirmPasswordReset, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function resetPassword(oobCode, newPassword) {
  return await confirmPasswordReset(auth, oobCode, newPassword);
}
