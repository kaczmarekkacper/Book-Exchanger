// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz6mHwLqIf1dPb82VOu9di0wNGKCUKb5k",
  authDomain: "book-exchanger1.firebaseapp.com",
  projectId: "book-exchanger1",
  storageBucket: "book-exchanger1.appspot.com",
  messagingSenderId: "1078312150309",
  appId: "1:1078312150309:web:3b962f956b8ba198cee6cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
const database = getFirestore(app);
export { auth, database };
