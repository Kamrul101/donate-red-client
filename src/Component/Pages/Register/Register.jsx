import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
const imageHosting = import.meta.env.VITE_Img;


const Register = () => {
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHosting}`
    const {createUser,updateUserProfile}= useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(imageHosting);
    const uploadImageToImgBB = async (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile);
  
      const response = await fetch(image_hosting_url, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image to ImgBB');
      }
  
      return response.json();
    };
    const handleRegister = async event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.files[0];
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(name,email,password,confirm,photo);
        if(password != confirm){
          Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: "Password didn't match",
              showConfirmButton: false,
              timer: 1500
            });
          return;
      }
        try{
          const imgbbResponse = await uploadImageToImgBB(photo);
      const imageUrl = imgbbResponse.data.url;
      
          createUser(email,password)
        .then(result=>{
            const registeredUser = result.user;
            console.log(registeredUser);
            updateUserProfile(name,imageUrl)
            .then(()=>{
              const saveUser = {name: name, email:email,photo: imageUrl}
              console.log(saveUser);
              fetch('http://localhost:5000/users',{
                method:"POST",
                headers:{
                  'content-type':'application/json'
                },
                body:JSON.stringify(saveUser)
              })
              .then(res=>res.json())
              .then(data=> {
                if(data.insertedId){
                  Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                });
                }
              })
              
                navigate('/')
                  
            })
        })
        } catch(error){
            console.log(error.message);
        }
        
        
    }
  return (
    
      
      <div className="card w-full md:w-1/3 md:mx-auto shadow-2xl bg-base-100 my-8">
        <div className="card-body">
        <h1 className="text-5xl font-bold">Sign Up</h1>
          <form onSubmit={handleRegister}>
              <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="input input-bordered"
            />
          </div>
              <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Password"
              name="password"
              className="input input-bordered"
            />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              name="confirm"
              className="input input-bordered"
            />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input type="file" 
            className="file-input file-input-bordered file-input-info w-full max-w-xs"
            name="photo" />
            
          </div>
          <div className="form-control mt-6">
            
            <input className="btn btn-primary" type="submit" value="Sign up" />
          </div>
          </form>
          <p className="my-4 text-center">Already have an account? <Link className="text-orange-600 text-bold" to='/login'>Login</Link></p>
          
        </div>
      </div>
   
  );
};

export default Register;
