// AuthContextProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase/auth/socialLogin";
import { toast } from "react-toastify";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "../firebase/init";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(firebase_app);
  const location = useLocation();

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
      if (currentUser && !location.pathname.includes("reset-password")) {
        // Check if not on reset password page
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
