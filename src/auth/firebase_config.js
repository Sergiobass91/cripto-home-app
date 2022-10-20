import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY_FIREBASE}`,
  authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  projectId: "cripto-home",
  storageBucket: "cripto-home.appspot.com",
  messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);