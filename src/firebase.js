import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAqRB-ROj0Abp5VOxPTJVr8wLuzCkzH57U",
    authDomain: "reminderapp-25d9e.firebaseapp.com",
    projectId: "reminderapp-25d9e",
    storageBucket: "reminderapp-25d9e.appspot.com",
    messagingSenderId: "257478406901",
    appId: "1:257478406901:web:8a686b0bc406b453780bbc",
    measurementId: "G-288YX97EP3"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
;
