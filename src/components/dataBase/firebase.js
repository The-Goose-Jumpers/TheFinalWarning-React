// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PZ7j5aVPloKlNPtEyOiCqiN-heaM-8Q",
  authDomain: "the-final-warning.firebaseapp.com",
  projectId: "the-final-warning",
  storageBucket: "the-final-warning.firebasestorage.app",
  messagingSenderId: "521593156500",
  appId: "1:521593156500:web:d6bc41b02832a21ad79581"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);