import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: "note-taker-24f3b",
    storageBucket: "note-taker-24f3b.appspot.com",
    messagingSenderId: "note-taker-24f3b.firebaseapp.com",
    appId:"1:155974219041:web:007c2e078e8a4bde6dfa60"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  
  
  const db = getFirestore()

  export {db}