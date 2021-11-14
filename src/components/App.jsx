import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {ThemeProvider} from '@material-ui/core/styles';


const getLocalStorage = () => {
  let note = localStorage.getItem('note');
  if (note) {
    return (note = JSON.parse(localStorage.getItem('note')));
  } else {
    return [];
  }
}




function App() {
  const [notes,setNotes]=useState(getLocalStorage())
  function addNote(newNote){
    setNotes(prevNote => {
    return [...prevNote,newNote]
    })
  
  }

  function deleteNote(id){
  setNotes(prevNote => {
    return prevNote.filter((noteItem,index) => {
        return index !==id
    })
  })
  }

  localStorage.setItem("note",JSON.stringify(notes));  
  

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
