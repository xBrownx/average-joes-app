// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBBivnrU-KHRFZL0kHk-hfSUAKjgj4EiKo",
  authDomain: "average-joes-coffee.firebaseapp.com",
  projectId: "average-joes-coffee",
  storageBucket: "average-joes-coffee.firebasestorage.app",
  messagingSenderId: "214804884671",
  appId: "1:214804884671:web:bc1b2bbc099abcb82d6a0a",
  measurementId: "G-SSD8T3X44R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);