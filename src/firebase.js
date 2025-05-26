import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyDDeYOFE2PV2VAUpPQULk1PpnNJqOLcrQY",
  authDomain: "scamaway-36069.firebaseapp.com",
  projectId: "scamaway-36069",
  storageBucket: "scamaway-36069.firebasestorage.app",
  messagingSenderId: "1050563493472",
  appId: "1:1050563493472:web:f194015a03f69a3bda0d05"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider,db };
