// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJItaYpviD25bsCZjwhPC3DZizaXcwZ9s",
  authDomain: "lab-act-2-d9e5a.firebaseapp.com",
  projectId: "lab-act-2-d9e5a",
  storageBucket: "lab-act-2-d9e5a.firebasestorage.app",
  messagingSenderId: "22922763522",
  appId: "1:22922763522:web:727126ef74f26634f7361b",
  measurementId: "G-W5QD3BTKJS",
};

// Initialize Firebase app if not already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics and Firestore
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };