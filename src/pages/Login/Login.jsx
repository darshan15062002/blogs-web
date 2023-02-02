import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import '../Register/Register.css'
const Login = () => {
  const navigate =useNavigate()

  const[err ,setErr]=useState(false)
  const [loading,setLoading]=useState(false)
  const handleSubmit =async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password)
     navigate('/')
   
       } catch (err) {
         setErr(true);
         setLoading(false);
       }
     
  

   
  };
  return (
    <div className="container">
      <div className="form_Wrapper">
        <h1>Login</h1>


        <form className="form_container" onSubmit={handleSubmit}>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
         
       
          <button>Sign In</button>
        </form>
        <p>YO don't have an account ? <Link to='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login
