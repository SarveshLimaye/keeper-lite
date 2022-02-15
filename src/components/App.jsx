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
import { Routes,Route,useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



const colRef = collection(db,'note')




function App() {

  
  const [notes,setNotes]=useState([])
  const [isLoaading,setisLoading]=useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const handleAction = (id) => {
    
    const authentication = getAuth();

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/notes')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        }).catch((error) => {
          console.log(error)
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/invalid-email'){
            toast.error('Please check the Email');
          }
          
 })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/notes')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      }).catch((error) => {
        if(error.code === 'auth/email-already-in-use'){
          toast.error('Email already in use');
        }
})
   }
  }
  

  useEffect(()=> {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/notes')
    }
   
   const getNote = async () => {
      const allNotes = await getDocs(colRef)
      setNotes(allNotes.docs.map((doc)=>({...doc.data(),id: doc.id})));
      setisLoading(false)
   }

   getNote()

  },[notes,navigate])






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

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
}

 
  

  return (
   isLoaading ? (<Loading />) : ( 
    <>
    <ToastContainer  />
    <Routes>
      <Route path="/" element = {<div><Header/> <CreateArea/></div>} />
      <Route path="/notes" element={ <div >
    <Header handleLogout={() => {handleLogout()}} />
    <CreateArea onAdd={addNote} />
    {notes.map((noteItem) => {
      return <Note key={noteItem.id} id={noteItem.id}  title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
    })}
  </div>} />
   <Route path="/login" loginform= {true} element={<Form title="Login" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(1)} />} />
   <Route path="/register" loginform={false} element={<Form title="Register" setEmail={setEmail} setPassword={setPassword} handleAction={() => handleAction(2)}/>} />
    </Routes>
    

  </>
  
 
  )
  );
}

export default App;
