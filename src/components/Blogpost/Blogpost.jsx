import React from 'react'
import Img from '../../img/Screenshot_20230126_064602.png'
import './Blogpost.css'
const Blogpost = () => {
  return (
    <div className='blog_wrapper' style={{display:'flex',gap:'25px'}}>
        <div className="blog_left">
            <h1>TITLE</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, incidunt possimus. Officia deleniti reprehenderit, at omnis sapiente quam quos distinctio nisi aspernatur in perspiciatis magni cupiditate ipsam eveniet blanditiis id quis sint quod dolor sequi voluptatibus architecto? Vero dignissimos nesciunt doloremque voluptates dicta debitis numquam. Libero aspernatur numquam a quasi! Maxime architecto placeat ad, optio vitae eaque corporis! Deleniti, molestiae! Quidem minus eveniet officia quia ea inventore expedita accusamus animi corporis distinctio. Saepe numquam perspiciatis ratione dolorem nam rerum totam beatae dolor labore laborum! Libero reprehenderit minima quasi quaerat at iste assumenda similique maxime officiis, fugiat doloremque debitis dolor? Debitis?</p>
        <button>Read me</button>
        </div>
        <div className="blog_right">
            <img src={Img}  alt="" />
        </div>
      
    </div>
  )
}

export default Blogpost
