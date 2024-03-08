import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { FaBeer,FaGoogle  } from 'react-icons/fa';
import { AuthContext } from "../../../Providers/AuthProviders";
import { GoogleAuthProvider } from "firebase/auth";


const Login = () => {

    const googleProvider = new GoogleAuthProvider();
    
   const {signInUser,signInWithGoogle} = useContext(AuthContext);

   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   const [error,setError] = useState('');

   const handleSignIn = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);
    setError('');
    signInUser(email,password)
    .then(result =>{
      const loggedUser = result.user;
      console.log(loggedUser);
      navigate(from, {replace:true})
    })
    .catch(error=>{
      console.log(error);
      setError('Email or password did not match')
    })

   }
   const handleGoogle = () =>{
    signInWithGoogle(googleProvider)
    .then((result) => {
        const loggedUser = result.user;
        
        const saveUser = {name: loggedUser.displayName, email:loggedUser.email, photo: loggedUser.photoURL}
        
        fetch('http://localhost:5173/',{
                  method:"POST",
                  headers:{
                    'content-type':'application/json'
                  },
                  body:JSON.stringify(saveUser)
                })
                .then(res=>res.json())
                .then(()=> {
                    navigate(from, { replace: true });
                  
                })
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
}

  return (
    
        <div className="card w-full md:w-1/3 md:mx-auto shadow-2xl bg-base-100 my-7 text-center ">
          <div className="card-body">
          <h1 className="text-5xl font-bold">Login now!</h1>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
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
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              
              <input className="btn btn-primary hover:bg-white hover:text-purple-950" type="submit" value="Login" />
            </div>
            </form>
            <p className="my-4 text-center">New to Donate-Red? </p>
            <Link className="text-orange-600 text-bold btn border-red-600 hover:bg-red-600 hover:text-white" to='/register'>Sign up</Link>
          </div>
        </div>
     
  );
};

export default Login;
