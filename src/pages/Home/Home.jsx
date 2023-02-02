import React, { useContext, useState } from 'react'
import Blogpost from '../../components/Blogpost/Blogpost'
import "react-quill/dist/quill.snow.css";
import './Home.css'
import Logo from '../../img/572.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import ReactQuill from "react-quill";
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import cross from '../../img/cross.png'

const Home = () => {

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const[show,setShow]=useState(false)
  const {currentUser} =useContext(AuthContext)
  return (
    <div className='blog'>
      <div className="header">
       <img src={Logo} alt="" />
         {!currentUser && <span><Link  style={{textDecoration:'none'}} to='/login'>Login</Link></span>}
         {currentUser && <span style={{display:'flex'}}> <img style={{height:'50px',width:'50px',borderRadius:'50%'}} onClick={()=>signOut(auth)} src={currentUser.photoURL} alt="" />
         <h4>{currentUser.displayName}</h4><h5 style={{background:'#A0C3D2',borderRadius:"50%",padding:'5px 10px'}} onClick={()=>setShow(true)}>Write</h5></span> }
      </div>
       <Blogpost/> 
       <Blogpost/> 
       <Blogpost/> 
       <Blogpost/> 
      
    { show && <div className="content">
    <img src={cross} height={20} width={20} alt="" onClick={()=>setShow(false)}/>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>}
      </div>
      
  )
}

export default Home
