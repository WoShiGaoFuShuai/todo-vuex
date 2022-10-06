import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs5QSKhYrtIojTRQEFCaOBqSJtH_ba8CY",
  authDomain: "todo-89c8f.firebaseapp.com",
  projectId: "todo-89c8f",
  storageBucket: "todo-89c8f.appspot.com",
  messagingSenderId: "215011456640",
  appId: "1:215011456640:web:dbfd6c8a6230f1f7d75865",
};

//init FIREBASE
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();

export { db, auth };
