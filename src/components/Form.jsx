import React from "react";

const Form = ({title,setEmail,setPassword,handleAction}) =>{
 return(
     <div className="card">
     <div className="heading">
        <h1>{title}</h1>
     </div>
             <input type="text"  placeholder="Username" onChange={(e) => {setEmail(e.target.value)}}  /> <br></br>
             <input type="password" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/><br></br>
             <button onClick={handleAction}>{title}</button>
             {title ==="Login" ? <div className="register"><p>Don't have an account? <a href="/register">Register</a></p> </div> : <div className="register"><p>Already registered? Just  <a href="/login">Login</a></p> </div> }
     </div>
 )

 //<div className="register"><p>Already registered? Just  <a href="/login">Login</a></p> </div>
}

export default Form