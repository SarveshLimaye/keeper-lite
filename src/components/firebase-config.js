import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: "note-taker-24f3b",
    storageBucket: "note-taker-24f3b.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  
  
  const db = getFirestore()

  export {db}