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
    apiKey: "AIzaSyB6Eb8aDiM8oukXQ6JADV0fr7rXEAcbIIA",
    authDomain: "genmedix-72c6d.firebaseapp.com",
    projectId: "genmedix-72c6d",
    storageBucket: "genmedix-72c6d.appspot.com",
    messagingSenderId: "446218503404",
    appId: "1:446218503404:web:b4fa70af38bde8f4efd1c9",
    measurementId: "G-WE1MRRPJYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };