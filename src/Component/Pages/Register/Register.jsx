import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";



const Register = () => {
    const {createUser}= useContext(AuthContext);
    
    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.log(name,email,password,photo);
        createUser(email,password)
        .then(result=>{
            const registeredUser = result.user;
            console.log(registeredUser);
        })
        .catch(error=>{
            console.log(error.message);
        })
        
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
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo url"
              name="photo"
              className="input input-bordered"
            />
            
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
