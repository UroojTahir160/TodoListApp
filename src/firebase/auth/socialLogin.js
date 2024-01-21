import { toast } from "react-toastify";
import firebase_app from "../init";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const userProfileData = {
      firstName: "",
      lastName: "",
      email: user.email ?? "",
      emailVerified: user.emailVerified ?? false,
      photoURL: user.photoURL ?? "",
      phoneNumber: user.phoneNumber ?? "",
      phoneNumberVerified: !!user.phoneNumber,
      uid: user.uid || "",
    };

    const splitDisplayName = user.displayName?.split(" ") ?? [];
    if (splitDisplayName.length > 1) {
      userProfileData.lastName = splitDisplayName.slice(1).join(" ");
    }
    userProfileData.firstName = splitDisplayName[0];

    return { result: userProfileData, error: null };
  } catch (error) {
    console.error("Google Sign-In Error: ", error);
    toast.error(error);
    return { result: null, error };
  }
}
