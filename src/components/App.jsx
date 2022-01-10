import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, 
  addDoc,getDocs
} from 'firebase/firestore'

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

const colRef = collection(db,'note')




function App() {
  const [notes,setNotes]=useState([])

  useEffect(()=> {
   const getNote = async () => {
      const allNotes = await getDocs(colRef)
      setNotes(allNotes.docs.map((doc)=>({...doc.data(),id: doc.id})));
   }

   getNote()
  },[])



console.log(notes);


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
      {notes.map((noteItem) => {
        return <Note key={noteItem.id} id={noteItem.id}  title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
      })}
    </div>
  );
}

export default App;
