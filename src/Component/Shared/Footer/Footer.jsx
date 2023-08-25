import React from "react";
import logo from '../../../assets/rsz_sfga.png'
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <img className="rounded-lg" src={logo} alt="" />
          <p>
            Donate Red
            <br />
            Donate to Save Life.
          </p>
          
        </div>
        <div>
          <span className="footer-title">Connect with us</span>
          <div className="grid grid-flow-col gap-4 text-4xl">
          <Link to="https://www.instagram.com/">
              <FaInstagramSquare />
            </Link>

            <Link to="https://www.facebook.com/">
              <FaFacebookSquare></FaFacebookSquare>
            </Link>

            <Link to="https://twitter.com/home">
              <FaTwitterSquare></FaTwitterSquare>
            </Link>
            <Link to="https://www.youtube.com/">
              <FaYoutubeSquare></FaYoutubeSquare>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-center p-4 bg-base-300 text-base-content">
        <div>
        <p>&copy; All rights reserved to-2023-Team-Red</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
