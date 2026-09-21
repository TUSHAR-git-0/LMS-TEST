import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "learning-management-sys-bccd1.firebaseapp.com",
  projectId: "learning-management-sys-bccd1",
  storageBucket: "learning-management-sys-bccd1.firebasestorage.app",
  messagingSenderId: "1033837492623",
  appId: "1:1033837492623:web:09ee21250bdfb1a705b3fa"
};

let app = null;
let auth = null;
let provider = null;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
  }
} catch (error) {
  console.warn("Firebase not configured: Google login will be unavailable.", error);
}

export { auth, provider };