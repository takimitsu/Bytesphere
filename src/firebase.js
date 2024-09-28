// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEgp7hog6VB77IcwMBBYYT7Jo4PKiyBtw",
  authDomain: "bytesphere-e6949.firebaseapp.com",
  projectId: "bytesphere-e6949",
  storageBucket: "bytesphere-e6949.appspot.com",
  messagingSenderId: "130747045599",
  appId: "1:130747045599:web:00542ae4acd1e17ebdbb6a",
  measurementId: "G-506MYS1EWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);