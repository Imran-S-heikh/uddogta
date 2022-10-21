// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB3IvZ3hdln8Xmpe74mXzZsU13zkJPeZPE",

  authDomain: "baki-5642e.firebaseapp.com",

  projectId: "baki-5642e",

  storageBucket: "baki-5642e.appspot.com",

  messagingSenderId: "280269559957",

  appId: "1:280269559957:web:bcd06b30401ac77225239c",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
