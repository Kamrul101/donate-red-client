import React from "react";
import logo from '../../../assets/rsz_sfga.png'
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="footer p-5 bg-neutral text-neutral-content flex flex-col md:flex-row md:justify-evenly md:items-center ">
        <div>
          <img className="rounded-lg" src={logo} alt="" />
          <p>
            Donate Red
            <br />
            Donate to Save Life.
          </p>
          
        </div>
        
        <div>
        <p>&copy; All rights reserved to-2024-Team-Red-ICE-201</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
