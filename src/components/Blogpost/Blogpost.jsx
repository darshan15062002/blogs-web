import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Img from '../../img/Screenshot_20230126_064602.png'
import './Blogpost.css'
const Blogpost = ({blog}) => {
console.log((blog.value))
const {currentUser} =useContext(AuthContext)
  return (
    <div className='blog_wrapper' style={{display:'flex',gap:'25px'}}>

        <div className="blog_left">
<div className="profile" style={{display:'flex',gap:'13px',alignItems:'center'}}><img src={blog.url} height='30px' style={{borderRadius:'50%',objectFit:'cover'}} alt="" />{currentUser?.uid == blog.userid && <a href="/">Edit</a> }</div>
            <h1>{blog.title}</h1>
            <div dangerouslySetInnerHTML={{__html: `${blog.value}`}}></div> 
        </div>
        <div className="blog_right">
            <img src={blog.img}  alt="" />
        </div>
      
    </div>
  )
}

export default Blogpost
