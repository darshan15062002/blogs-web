import React, { useContext, useEffect, useState } from 'react'
import Blogpost from '../../components/Blogpost/Blogpost'
import 'quill/dist/quill.snow.css';
import './Home.css'
import Logo from '../../img/572.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useQuill } from 'react-quilljs';
import { auth, db, storage } from '../../firebase'
import { signOut } from 'firebase/auth'
import Img from "../../img/icons8-add-image-64.png";
import cross from '../../img/cross.png'
import { v4 as uuid} from 'uuid'
import { arrayUnion, doc, getDoc, getDocs, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Home = () => {

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const[show,setShow]=useState(false)
  const {currentUser} =useContext(AuthContext)
  const [blog,setBlog]=useState([])

  const { quill, quillRef } = useQuill();


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
       
        setValue(quillRef.current.firstChild.innerHTML); 
      });
    }
  }, [quill]);



  useEffect(() => {
    const unSub = onSnapshot(doc(db, "Blog", 'blogs'), (doc) => {
      doc.exists() && setBlog(doc.data().blog);
    });

    return () => {
      unSub();
    };
  },[quill]);


  const handleSubmit =async()=>{
    const storageRef = ref(storage, uuid());




    const uploadTask = uploadBytesResumable(storageRef, file).then(()=> {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try{   //create empty user chats on firestore
          const res =await getDoc(doc(db, "Blog", 'blogs'));
          console.log(res.data());
          if (!res.exists()){
            await setDoc(doc(db, "Blog", 'blogs'),{blogs:[]});
          }
          
          updateDoc(doc(db,"Blog", 'blogs'), {
            blog: arrayUnion({
              id: uuid(),
              title,
              value,
              userid:currentUser.uid,
              url:currentUser.photoURL,
              date: Date.now(),
              img: downloadURL,
            })
          })
          setShow(false)
          alert('published successfully');
          
         
      }
        catch{
          console.log('error');
        }
      })
  })}


  return (
    <div className='blog'>
      <div className="header">
       <img src={Logo} alt="" />
         {!currentUser && <span><Link  style={{textDecoration:'none'}} to='/login'>Login</Link></span>}
         {currentUser && <span style={{display:'flex'}}> <img style={{height:'50px',width:'50px',borderRadius:'50%'}} onClick={()=>signOut(auth)} src={currentUser.photoURL} alt="" />
         <h4>{currentUser.displayName}</h4><h5 style={{background:'#A0C3D2',borderRadius:"50%",padding:'5px 10px'}} onClick={()=>setShow(true)}>Write</h5></span> }
      </div>{

        blog.map((blog) => {
          return (
            <Blogpost key={blog.id} blog={blog} />
          )
        })}

      
    { show && <div className="content">
    <img src={cross} height={20} width={20} alt="" onClick={()=>setShow(false)}/>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
          <input type="file"  onChange={(e) => setFile(e.target.files[0])} id="file" style={{ display: "none" }} />
          <label htmlFor="file" >
            <img src={Img} alt="" />
            
          </label>
        <div className="editorContainer">
        <div ref={quillRef} />
        </div>
        <button style={{padding:'5px 10px',background:'#A0C3D2'}} onClick={handleSubmit}>Publish</button>
      </div>}
      </div>
      
  )
}

export default Home
