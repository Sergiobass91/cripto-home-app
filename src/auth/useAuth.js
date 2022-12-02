import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../auth/firebase_config";


export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const updateUser = (name) =>
  updateProfile(auth.currentUser, {displayName: name});

export const logIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logOut = () =>
  signOut(auth);

export const onAuth = () =>
  onAuthStateChanged(auth, (user)=> user);

export const userAuth = () =>
  auth.currentUser;

export const resetUserPassword = (email) =>
  sendPasswordResetEmail(auth, email);

export const signInGoogleAccount = () => {
  const provider =  new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}