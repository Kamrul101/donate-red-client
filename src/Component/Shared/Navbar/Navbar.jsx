import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/rsz_sfga.png'
import { FaUserCircle } from "react-icons/fa";

import { AuthContext } from "../../../Providers/AuthProviders";

const Navbar = () => {

  const {user, logOut} = useContext(AuthContext);
  
  const handleLogOut =() =>{
    logOut()
    .then(()=>{})
    .catch(error => console.log(error))
  }

    const navOption = <>
    <li className="hover:bg-slate-300 rounded-lg"><Link to='/'>Home</Link></li>
    <li className="hover:bg-slate-300 rounded-lg"><Link to='/lookDonor'>Look for Donor</Link></li>
    <li className="hover:bg-slate-300 rounded-lg"><Link to='/request'>Sent Requests</Link></li>
    
    </>
  return (
    <>
      <div className="navbar bg-opacity-50 bg-red-800 text-white py-1">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-orange-400 text-white rounded-box w-52"
            >
                {navOption}
              
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img className="rounded-lg" style={{width:"50px"}} src={logo} alt="Donate-Red" />
        </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-2xl">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end">
        {user && (
          <Link to={`/UserProfile`}><>
              {user.photoURL == null ? (
                <FaUserCircle className="text-5xl mr-2"></FaUserCircle>
              ) : (
                <div
                  className="mr-2 tooltip tooltip-bottom"
                  data-tip={user.displayName}
                  style={{ width: "55px" }}
                  alt=""
                >
                  <img
                    className="rounded-full mr-2"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
              )}
            </></Link>
            
          )}
        {
            user? <Link onClick={handleLogOut} className="btn btn-error text-white" to='/login'>Logout</Link>:<Link className="btn btn-error text-white" to='/login'>Login</Link>
        }

        </div>
      </div>
    </>
  );
};

export default Navbar;
