// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSUt7UCFMw6rMM_V0KOOyV4YmNd-hZJts",
  authDomain: "fontend-2.firebaseapp.com",
  projectId: "fontend-2",
  storageBucket: "fontend-2.appspot.com",
  messagingSenderId: "364655035431",
  appId: "1:364655035431:web:0f8abd9ddcea3ab6b9fa02",
  measurementId: "G-5QRBJ1GRS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getFirestore(app);
export { analytics };