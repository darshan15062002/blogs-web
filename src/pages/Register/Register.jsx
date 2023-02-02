import React, { useState } from "react";
import Img from "../../img/icons8-add-image-64.png";
import "./Register.css";


import { createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {auth,db,storage} from '../../firebase'
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  
  const navigate = useNavigate();
  const [err ,setErr]=useState(false)
  const [loading , setLoading]=useState(false)




  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

       //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${name+ date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName:name,
            photoURL: downloadURL,
          });

           //create user on firestore
           await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName:name,
            email,
            photoURL: downloadURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userBlog", res.user.uid), {});
          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      });
    });

  } catch (err) {
    setErr(true);
    setLoading(false);
  }
};
   


  return (
    <div className="container">
      <div className="form_Wrapper">
        <h1>Register</h1>

        <form className="form_container " onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={Img} alt="" />
            <span>Add profile picture</span>
          </label>
          <button>Sign UP</button>
        </form>
        <p>Yo do have an acoount ?<Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
