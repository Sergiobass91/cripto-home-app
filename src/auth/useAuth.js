import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase_config";

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
