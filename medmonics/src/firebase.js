// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnk9SX2zasZmohC_gtIN2aLujU35VJpNA",
  authDomain: "medmonics-4da62.firebaseapp.com",
  projectId: "medmonics-4da62",
  storageBucket: "medmonics-4da62.firebasestorage.app",
  messagingSenderId: "335377796396",
  appId: "1:335377796396:web:ea3895601fe05a7d0d7089",
  measurementId: "G-9M1V49D9M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);