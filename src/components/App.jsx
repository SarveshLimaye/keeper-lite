import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, 
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCmHXHQm2VPwkfEo80P1ZDWAmxT0qB9_8w",
  authDomain: "note-taker-24f3b.firebaseapp.com",
  projectId: "note-taker-24f3b",
  storageBucket: "note-taker-24f3b.appspot.com",
  messagingSenderId: "155974219041",
  appId: "1:155974219041:web:007c2e078e8a4bde6dfa60"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//
const db = getFirestore()

const colRef = collection(db,'note')


function App() {
  const [notes,setNotes]=useState([])
  function addNote(newNote){
    
     setNotes((prevNote) => {
      return [...prevNote,newNote]
    })
    addDoc(colRef,{
      title: newNote.title,
      content: newNote.content
    })
  }

  function deleteNote(id){
  setNotes(prevNote => {
    return prevNote.filter((noteItem,index) => {
        return index !==id
    })
  })
  }

 
  

  return (
    <div >
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem,index) => {
        return <Note key={index} id={index}  title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
      })}
    </div>
  );
}

export default App;
