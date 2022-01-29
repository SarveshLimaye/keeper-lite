import React from "react";

const Form = ({title,setEmail,setPassword,handleAction}) =>{
 return(
     <div>
        <h1>{title}</h1>
             <input type="text" placeholder="Username" onChange={(e) => {setEmail(e.target.value)}}  />
             <input type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
             <button onClick={handleAction}>{title}</button>
     </div>
 )

}

export default Form