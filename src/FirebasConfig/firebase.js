// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}  from "firebase/firestore";
import { getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8GT1gtfB0P7LU6qacd6LPT3hN-V462vY",
  authDomain: "login-edb1b.firebaseapp.com",
  projectId: "login-edb1b",
  storageBucket: "login-edb1b.appspot.com",
  messagingSenderId: "722451192432",
  appId: "1:722451192432:web:ba5521052f6189b7f1f2b5",
  measurementId: "G-FR9499METL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database =getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);