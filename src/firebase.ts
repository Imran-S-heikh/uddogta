// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCLq3K_eJFEGJT1iDAzE3HgnkNMsiIjY-o",
  authDomain: "uddogta.firebaseapp.com",
  projectId: "uddogta",
  storageBucket: "uddogta.appspot.com",
  messagingSenderId: "811306740004",
  appId: "1:811306740004:web:53aa450bf41c313e36ebb1",
  measurementId: "G-BXK6Q1QD32",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// Check if its a development environment
if (typeof process !== "undefined" && process?.env?.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}