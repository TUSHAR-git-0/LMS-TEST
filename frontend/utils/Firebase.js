// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDQ9GMV_dtbndJ1G_PekxZHhRRnrB0ni1k",
  authDomain: "learning-b85af.firebaseapp.com",
  projectId: "learning-b85af",
  storageBucket: "learning-b85af.firebasestorage.app",
  messagingSenderId: "889057504808",
  appId: "1:889057504808:web:de15004573324905b48f1d",
  measurementId: "G-T6XJYKQTZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =  new GoogleAuthProvider();

export{auth , provider}