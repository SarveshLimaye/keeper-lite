import React,{useEffect, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import {useNavigate } from 'react-router-dom'


function CreateArea(props) {
  
  const[note,setNote]=useState({
    title:"",
    content:"",
  })
  let navigate = useNavigate();

  

  const[isexpand,setisExpand]=useState(false)

  function handleChange(event){
    const {name,value}=event.target
    setNote(prevNote =>{
      return {
        ...prevNote,
        [name]:value
      }
    })
  }

  function submitNote(event){
    props.onAdd(note)
    event.preventDefault()
    setNote({
      title:"",
      content:"",
    })
  }

  function expand (){
    setisExpand(true)
  }

  
    
useEffect (() => {
  let authToken = sessionStorage.getItem('Auth Token')
  if (authToken) {
    navigate('/notes')
}

if (!authToken) {
    navigate('/login')
}
},[navigate])
  

  
  return (
    <div>

    
       <form className="form">
       {isexpand ? <input name="title" placeholder="Title" onChange={handleChange} value={note.title} /> : null}
        <textarea name="content" onClick={expand} onChange={handleChange} value={note.content} placeholder="Take a note..." rows={isexpand ? 3 :1}/>
       {isexpand ?<div> <button onClick={submitNote} className="button"><AddIcon /> </button> </div> : null}
      </form> 
      
    </div>
  );
}

export default CreateArea;
