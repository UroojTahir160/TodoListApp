// AuthContextProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase/auth/socialLogin";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "../firebase/init";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase_app);

  const googleSignIn = async () => {
    const { result, error } = await signInWithGoogle();
    if (error) {
      toast.error(error);
    } else {
      setUser(result);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state: ", currentUser);

      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser,
    googleSignIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
