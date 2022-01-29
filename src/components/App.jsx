import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Loading from "./Loader";
import Form from "./Form";
import CreateArea from "./CreateArea";
import { collection, 
  addDoc,getDocs, doc, deleteDoc
} from 'firebase/firestore'
import { db } from "./firebase-config";
import { BrowserRouter as Router, Routes,Route,useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'



const colRef = collection(db,'note')




function App() {

  
  const [notes,setNotes]=useState([])
  const [isLoaading,setisLoading]=useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const handleAction = (id) => {

    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
   }
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
   <Route path="/login" element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
   <Route path="/register" element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)}/>} />
    </Routes>
    

  </>
  
  
  </Router>
 
  )
  );
}

export default App;
