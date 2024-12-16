// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJItaYpviD25bsCZjwhPC3DZizaXcwZ9s",
  authDomain: "lab-act-2-d9e5a.firebaseapp.com",
  projectId: "lab-act-2-d9e5a",
  storageBucket: "lab-act-2-d9e5a.firebasestorage.app",
  messagingSenderId: "22922763522",
  appId: "1:22922763522:web:727126ef74f26634f7361b",
  measurementId: "G-W5QD3BTKJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};