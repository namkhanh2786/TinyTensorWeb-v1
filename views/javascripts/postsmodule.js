import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8HiMvd58ixrY4qX9iHts8yyuVinCjESM",
  authDomain: "tiny-ml-web.firebaseapp.com",
  databaseURL: "https://tiny-ml-web-default-rtdb.firebaseio.com",
  projectId: "tiny-ml-web",
  storageBucket: "tiny-ml-web.appspot.com",
  messagingSenderId: "777738149913",
  appId: "1:777738149913:web:a8a6ed26e077dccb93ca88",
  measurementId: "G-KM3RVCNEF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()
const analytics = getAnalytics(app);