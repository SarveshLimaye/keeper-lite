import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Loading from "./Loader";
import CreateArea from "./CreateArea";
import { collection, 
  addDoc,getDocs, doc, deleteDoc
} from 'firebase/firestore'
import { db } from "./firebase-config";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'



const colRef = collection(db,'note')




function App() {
  const [notes,setNotes]=useState([])
  const [isLoaading,setisLoading]=useState(true)

  useEffect(()=> {
   const getNote = async () => {
      const allNotes = await getDocs(colRef)
      setNotes(allNotes.docs.map((doc)=>({...doc.data(),id: doc.id})));
      setisLoading(false)
   }

   getNote()
   
  },[notes])






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

  const noteDoc = doc(db,'note',id)

  deleteDoc(noteDoc)

  }

 
  

  return (
   isLoaading ? (<Loading />) : ( 
    <Router>
    <>
    <Routes>
      <Route path="/" element={ <div >
    <Header />
    <CreateArea onAdd={addNote} />
    {notes.map((noteItem) => {
      return <Note key={noteItem.id} id={noteItem.id}  title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
    })}
  </div>} />
   <Route path="/login" element={<h1>Login</h1>} />
    </Routes>
    

  </>
  
  
  </Router>
 
  )
  );
}

export default App;
