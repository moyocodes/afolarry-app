// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ18enBJTiLbEPnkmQMlVnYOo_rtsXAq0",
  authDomain: "afolaray-53fc5.firebaseapp.com",
  projectId: "afolaray-53fc5",
  storageBucket: "afolaray-53fc5.firebasestorage.app",
  messagingSenderId: "220743935609",
  appId: "1:220743935609:web:1a42f84297cad27b0b56a8",
  measurementId: "G-Z37MKPNSYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
