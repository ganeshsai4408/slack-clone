// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAVwv8qpNIUnXdAqXUYWgwDeg2OI5YqOeI",
  authDomain: "https://slack-clone-delta-indol.vercel.app/",
  databaseURL: "https://slack-clone-1ab3a-default-rtdb.firebaseio.com",
  projectId: "slack-clone-1ab3a",
  storageBucket: "slack-clone-1ab3a.firebasestorage.app",
  messagingSenderId: "498509717556",
  appId: "1:498509717556:web:35de2e6c19468341302a61",
  measurementId: "G-EFMBG828F3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, provider,collection, addDoc, serverTimestamp  };
