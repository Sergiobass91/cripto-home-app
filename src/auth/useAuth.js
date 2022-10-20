import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../auth/firebase_config";

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () =>
  signOut(auth);

export const onAuth = () =>
  onAuthStateChanged(auth, currentUser => {
    console.log(currentUser)
});


